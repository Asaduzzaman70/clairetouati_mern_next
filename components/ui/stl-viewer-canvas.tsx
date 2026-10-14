"use client";

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";
import { AlertCircleIcon, RefreshCwIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface StlViewerCanvasProps {
  modelUrl: string;
  color?: string;
  autoRotate?: boolean;
  autoRotateSpeed?: number;
  showGrid?: boolean;
  className?: string;
  onError?: (err: string) => void;
  onLoaded?: () => void;
}

export interface StlViewerCanvasRef {
  resetCamera: () => void;
  takeScreenshot: () => string | null;
}

/**
 * Utility to identify whether a 3D model asset is an .STL format.
 * Accounts for direct .stl extensions, local file names, and Cloudinary '/raw/upload/' CDN URLs.
 */
export function isStlModel(url?: string | null, fileName?: string | null): boolean {
  if (!url && !fileName) return false;
  if (fileName && fileName.toLowerCase().endsWith(".stl")) return true;
  if (!url) return false;
  const cleanUrl = url.toLowerCase();
  if (cleanUrl.endsWith(".stl") || cleanUrl.includes(".stl?")) return true;
  if (cleanUrl.includes("/raw/upload/")) return true;
  return false;
}

// In-memory ArrayBuffer cache for instant model switching without re-downloading
const stlBufferCache = new Map<string, ArrayBuffer>();

export const StlViewerCanvas = forwardRef<StlViewerCanvasRef, StlViewerCanvasProps>(
  function StlViewerCanvas(
    {
      modelUrl,
      color = "#FFC700",
      autoRotate = true,
      autoRotateSpeed = 2.0,
      showGrid = false,
      className = "",
      onError,
      onLoaded,
    },
    ref
  ) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showLoadingUi, setShowLoadingUi] = useState(false);
    const [isModelVisible, setIsModelVisible] = useState(false);
    const [loadError, setLoadError] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);

    // Three.js internal references (persistent across model swaps)
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const meshRef = useRef<THREE.Mesh | null>(null);
    const gridRef = useRef<THREE.GridHelper | null>(null);
    const materialRef = useRef<THREE.MeshStandardMaterial | null>(null);
    const defaultCameraStateRef = useRef<{ position: THREE.Vector3; target: THREE.Vector3 } | null>(null);
    const animationFrameIdRef = useRef<number | null>(null);
    const currentScaleRef = useRef(0.001);
    const targetScaleRef = useRef(1.0);

    // Debounce loading overlay display: only show if download/parse takes > 450ms
    useEffect(() => {
      let timer: NodeJS.Timeout | null = null;
      if (isLoading) {
        timer = setTimeout(() => {
          setShowLoadingUi(true);
        }, 450);
      } else {
        setShowLoadingUi(false);
      }
      return () => {
        if (timer) clearTimeout(timer);
      };
    }, [isLoading]);

    // Expose resetCamera and takeScreenshot to parent component
    useImperativeHandle(ref, () => ({
      resetCamera: () => {
        if (cameraRef.current && controlsRef.current && defaultCameraStateRef.current) {
          const { position, target } = defaultCameraStateRef.current;
          cameraRef.current.position.copy(position);
          controlsRef.current.target.copy(target);
          controlsRef.current.update();
        }
      },
      takeScreenshot: () => {
        if (rendererRef.current) {
          return rendererRef.current.domElement.toDataURL("image/png");
        }
        return null;
      },
    }));

    // Update material color dynamically when prop changes (in-place, 0ms latency)
    useEffect(() => {
      if (materialRef.current) {
        try {
          materialRef.current.color.set(color);
        } catch {
          materialRef.current.color.set("#FFC700");
        }
      }
    }, [color]);

    // Update auto-rotate on controls dynamically
    useEffect(() => {
      if (controlsRef.current) {
        controlsRef.current.autoRotate = autoRotate;
        controlsRef.current.autoRotateSpeed = autoRotateSpeed;
      }
    }, [autoRotate, autoRotateSpeed]);

    // 1. One-time Three.js Engine Mount: Scene, Camera, WebGLRenderer, Lights & Loop
    useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      container.innerHTML = "";

      const width = container.clientWidth || 600;
      const height = container.clientHeight || 500;

      // Scene
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Camera
      const camera = new THREE.PerspectiveCamera(45, width / height, 0.05, 1000);
      camera.position.set(5, 4, 5);
      cameraRef.current = camera;

      // High-performance WebGL Renderer with PBR tone mapping
      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        preserveDrawingBuffer: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.2;
      rendererRef.current = renderer;

      container.appendChild(renderer.domElement);

      // OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.06;
      controls.autoRotate = autoRotate;
      controls.autoRotateSpeed = autoRotateSpeed;
      controls.minDistance = 0.1;
      controls.maxDistance = 500;
      controlsRef.current = controls;

      // Balanced Studio Lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
      keyLight.position.set(10, 15, 10);
      scene.add(keyLight);

      const fillLight = new THREE.DirectionalLight(0xfff5ea, 0.8);
      fillLight.position.set(-10, -5, -10);
      scene.add(fillLight);

      const hemiLight = new THREE.HemisphereLight(0xffffff, 0x333333, 0.7);
      scene.add(hemiLight);

      // Animation Loop with organic 3D scale blooming
      const animate = () => {
        animationFrameIdRef.current = requestAnimationFrame(animate);

        if (meshRef.current) {
          if (currentScaleRef.current < 0.999) {
            currentScaleRef.current += (targetScaleRef.current - currentScaleRef.current) * 0.08;
            meshRef.current.scale.set(
              currentScaleRef.current,
              currentScaleRef.current,
              currentScaleRef.current
            );
          } else if (currentScaleRef.current !== 1.0 && targetScaleRef.current === 1.0) {
            currentScaleRef.current = 1.0;
            meshRef.current.scale.set(1, 1, 1);
          }
        }

        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      // Responsive Canvas ResizeObserver
      const resizeObserver = new ResizeObserver((entries) => {
        if (!entries || !entries.length) return;
        const entry = entries[0];
        const w = entry.contentRect.width;
        const h = entry.contentRect.height;
        if (w > 0 && h > 0) {
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
          renderer.setSize(w, h);
        }
      });
      resizeObserver.observe(container);

      return () => {
        resizeObserver.disconnect();
        if (animationFrameIdRef.current) {
          cancelAnimationFrame(animationFrameIdRef.current);
        }
        controls.dispose();
        renderer.dispose();
        if (container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      };
    }, []); // Runs ONCE on mount

    // 2. Geometry Loader & Model Swap (Canvas and WebGL context remain permanently mounted)
    useEffect(() => {
      if (!modelUrl) return;

      let isMounted = true;
      setIsLoading(true);
      setLoadError(null);
      setProgress(0);

      const loader = new STLLoader();
      const secureUrl =
        typeof window !== "undefined" && window.location.protocol === "https:"
          ? modelUrl.replace(/^http:\/\//i, "https://")
          : modelUrl;

      // Check cache first for instantaneous rendering
      const cached = stlBufferCache.get(secureUrl);
      const fetchBuffer = cached
        ? Promise.resolve(cached)
        : fetch(secureUrl)
            .then((response) => {
              if (!response.ok) {
                throw new Error(`HTTP Error ${response.status}: Failed to download STL file from CDN`);
              }
              const contentLength = response.headers.get("content-length");
              const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;

              if (!response.body || totalBytes === 0) {
                return response.arrayBuffer();
              }

              const reader = response.body.getReader();
              let loadedBytes = 0;
              const chunks: Uint8Array[] = [];

              function readStream(): Promise<ArrayBuffer> {
                return reader.read().then(({ done, value }) => {
                  if (done) {
                    const combined = new Uint8Array(loadedBytes);
                    let offset = 0;
                    for (const chunk of chunks) {
                      combined.set(chunk, offset);
                      offset += chunk.length;
                    }
                    return combined.buffer;
                  }
                  if (value) {
                    chunks.push(value);
                    loadedBytes += value.length;
                    if (totalBytes > 0 && isMounted) {
                      const pct = Math.min(Math.round((loadedBytes / totalBytes) * 100), 99);
                      setProgress(pct);
                    }
                  }
                  return readStream();
                });
              }

              return readStream();
            })
            .then((buf) => {
              stlBufferCache.set(secureUrl, buf);
              return buf;
            });

      fetchBuffer
        .then((arrayBuffer) => {
          if (!isMounted) return;

          const scene = sceneRef.current;
          const camera = cameraRef.current;
          const controls = controlsRef.current;
          if (!scene || !camera || !controls) return;

          // Parse geometry
          const geometry = loader.parse(arrayBuffer);
          geometry.computeVertexNormals();
          geometry.center();
          geometry.computeBoundingBox();
          geometry.computeBoundingSphere();

          const boundingSphere = geometry.boundingSphere;
          const radius = boundingSphere ? boundingSphere.radius : 1.5;

          // Clean previous mesh & grid
          if (meshRef.current) {
            scene.remove(meshRef.current);
            meshRef.current.geometry.dispose();
            if (Array.isArray(meshRef.current.material)) {
              meshRef.current.material.forEach((m) => m.dispose());
            } else {
              meshRef.current.material.dispose();
            }
            meshRef.current = null;
          }

          if (gridRef.current) {
            scene.remove(gridRef.current);
            gridRef.current.geometry.dispose();
            gridRef.current = null;
          }

          // Setup PBR Material
          let parsedColor = 0xffc700;
          try {
            parsedColor = new THREE.Color(color).getHex();
          } catch {
            parsedColor = 0xffc700;
          }

          const material = new THREE.MeshStandardMaterial({
            color: parsedColor,
            roughness: 0.35,
            metalness: 0.2,
          });
          materialRef.current = material;

          const mesh = new THREE.Mesh(geometry, material);
          currentScaleRef.current = 0.001;
          targetScaleRef.current = 1.0;
          mesh.scale.set(0.001, 0.001, 0.001);
          meshRef.current = mesh;
          scene.add(mesh);

          // Subtle CAD Edge lines for high visual clarity
          try {
            const edges = new THREE.EdgesGeometry(geometry, 28);
            const lineMaterial = new THREE.LineBasicMaterial({
              color: 0x000000,
              opacity: 0.22,
              transparent: true,
            });
            const lineSegments = new THREE.LineSegments(edges, lineMaterial);
            mesh.add(lineSegments);
          } catch {
            // Optional
          }

          // Grounding grid under the model (if enabled)
          if (showGrid) {
            const gridHelper = new THREE.GridHelper(radius * 3.5, 14, 0x888888, 0x333333);
            gridHelper.position.y = -radius * 1.05;
            const gridMaterial = gridHelper.material as THREE.Material;
            gridMaterial.transparent = true;
            gridMaterial.opacity = 0.4;
            gridRef.current = gridHelper;
            scene.add(gridHelper);
          }

          // Frame the camera automatically based on bounding sphere radius
          const fitDistance = radius * 2.6;
          camera.position.set(fitDistance * 0.75, fitDistance * 0.5, fitDistance * 0.75);
          camera.near = radius * 0.01;
          camera.far = radius * 100;
          camera.updateProjectionMatrix();

          controls.target.set(0, 0, 0);
          controls.update();

          defaultCameraStateRef.current = {
            position: camera.position.clone(),
            target: controls.target.clone(),
          };

          setIsLoading(false);
          setIsModelVisible(true);
          setProgress(100);
          onLoaded?.();
        })
        .catch((err: any) => {
          if (!isMounted) return;
          const errorMsg = err?.message || "Failed to parse or render .STL file";
          setLoadError(errorMsg);
          setIsLoading(false);
          onError?.(errorMsg);
        });

      return () => {
        isMounted = false;
      };
    }, [modelUrl, showGrid]);

    return (
      <div className={`relative w-full h-full min-h-60 select-none overflow-hidden ${className}`}>
        {/* Canvas DOM Holder */}
        <div
          ref={containerRef}
          className="w-full h-full cursor-grab active:cursor-grabbing outline-hidden focus:outline-hidden"
          title="Drag to rotate • Scroll to zoom • Right-click to pan"
        />

        {/* Loading Overlay (only shown on slow downloads > 350ms to prevent visual flash) */}
        {showLoadingUi && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xs transition-opacity p-4">
            <div className="relative size-14 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-3 border-amber-500/20 border-t-amber-500 animate-spin" />
              <div className="size-8 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500 font-bold text-xs font-mono">
                STL
              </div>
            </div>
            <p className="mt-3 text-xs font-semibold text-foreground tracking-wide">
              Loading 3D STL Model...
            </p>
            {progress > 0 && progress < 100 && (
              <div className="w-40 mt-2 bg-muted rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-amber-500 h-full rounded-full transition-all duration-200"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}
            <span className="text-[10px] text-muted-foreground mt-1.5 font-mono">
              Parsing STL binary vertices...
            </span>
          </div>
        )}

        {/* Error State */}
        {loadError && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center bg-background/95 backdrop-blur-xs gap-3">
            <div className="size-10 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center border border-destructive/20 shadow-xs">
              <AlertCircleIcon className="size-5" />
            </div>
            <div className="space-y-1 max-w-xs">
              <h4 className="text-xs font-bold text-foreground">Failed to Load STL Model</h4>
              <p className="text-[11px] text-muted-foreground line-clamp-3 font-mono">
                {loadError}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                setIsLoading(true);
                setLoadError(null);
              }}
              className="h-7 px-3 text-xs gap-1.5 cursor-pointer border-border"
            >
              <RefreshCwIcon className="size-3" />
              Retry Load
            </Button>
          </div>
        )}
      </div>
    );
  }
);

export default StlViewerCanvas;
