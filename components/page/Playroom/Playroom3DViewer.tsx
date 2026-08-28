"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { LetterItem } from "./playroomData";
import fontData from "@/public/fonts/helvetiker_bold.typeface.json";

interface Playroom3DViewerProps {
  currentLetter: LetterItem;
}

export default function Playroom3DViewer({ currentLetter }: Playroom3DViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;
    let renderer: THREE.WebGLRenderer | null = null;
    let controls: OrbitControls | null = null;
    let mesh: THREE.Mesh | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.PerspectiveCamera | null = null;

    try {
      // 1. Scene setup
      scene = new THREE.Scene();

      // 2. Camera setup
      const width = container.clientWidth || 400;
      const height = container.clientHeight || 400;
      camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
      camera.position.set(0, 0, 7.5);

      // 3. Renderer setup
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(width, height);
      renderer.setClearColor(0x000000, 0); // Transparent background
      container.appendChild(renderer.domElement);

      // 4. Lighting setup
      const ambientLight = new THREE.AmbientLight(0xffffff, 1.8);
      scene.add(ambientLight);

      const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.0);
      dirLight1.position.set(5, 8, 6);
      scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.0);
      dirLight2.position.set(-5, -4, 4);
      scene.add(dirLight2);

      const pointLight = new THREE.PointLight(0xffffff, 1.2, 50);
      pointLight.position.set(0, 4, 5);
      scene.add(pointLight);

      // 5. Controls setup (OrbitControls for mouse & touch rotation)
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false;
      controls.enablePan = false;
      controls.rotateSpeed = 0.8;
      controls.autoRotate = true;
      controls.autoRotateSpeed = 1.2;
      controls.minPolarAngle = Math.PI / 4;
      controls.maxPolarAngle = (3 * Math.PI) / 4;

      // 6. Font & Geometry
      const loader = new FontLoader();
      const font = loader.parse(fontData);

      const createTextMesh = (letter: string, colorHex: string) => {
        if (mesh && scene) {
          scene.remove(mesh);
          mesh.geometry.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else {
            mesh.material.dispose();
          }
        }

        const geometry = new TextGeometry(letter, {
          font: font,
          size: 3.0,
          depth: 0.65,
          curveSegments: 16,
          bevelEnabled: true,
          bevelThickness: 0.1,
          bevelSize: 0.05,
          bevelOffset: 0,
          bevelSegments: 5,
        });

        geometry.computeBoundingBox();
        geometry.center();

        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(colorHex),
          roughness: 0.22,
          metalness: 0.18,
        });

        mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.1, 0.1, 0.1); // Start small for enter pop animation
        if (scene) scene.add(mesh);
      };

      createTextMesh(currentLetter.letter, currentLetter.colorHex);

      // 7. Animation loop with gentle idle rotation
      let scale = 0.1;
      const animate = () => {
        animationFrameId = requestAnimationFrame(animate);

        // Smooth pop-in animation on letter change
        if (mesh && scale < 1) {
          scale += (1 - scale) * 0.15;
          mesh.scale.set(scale, scale, scale);
        }

        if (controls) controls.update();
        if (renderer && scene && camera) renderer.render(scene, camera);
      };
      animate();

      // 8. Resize Observer
      const resizeObserver = new ResizeObserver((entries) => {
        if (!entries[0] || !renderer || !camera) return;
        const { width: newWidth, height: newHeight } = entries[0].contentRect;
        if (newWidth === 0 || newHeight === 0) return;
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(newWidth, newHeight);
      });
      resizeObserver.observe(container);

      // Cleanup
      return () => {
        cancelAnimationFrame(animationFrameId);
        resizeObserver.disconnect();
        if (controls) controls.dispose();
        if (mesh && scene) {
          scene.remove(mesh);
          mesh.geometry.dispose();
        }
        if (renderer) {
          renderer.dispose();
          if (renderer.domElement && container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        }
      };
    } catch (err) {
      console.error("WebGL 3D Viewer Error:", err);
      setWebGlSupported(false);
    }
  }, [currentLetter.letter, currentLetter.colorHex]);

  if (!webGlSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center select-none">
        <span
          className="text-[140px] sm:text-[180px] md:text-[220px] font-black leading-none drop-shadow-md transition-colors duration-300"
          style={{ color: currentLetter.colorHex }}
        >
          {currentLetter.letter}
        </span>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing flex items-center justify-center select-none"
      title="Slide or drag to rotate 3D letter"
    />
  );
}
