"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Maximize2Icon, Minimize2Icon } from "lucide-react";
import { StlViewerCanvas, isStlModel } from "@/components/ui/stl-viewer-canvas";

// TypeScript declaration for Google's <model-viewer> web component
declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string;
          alt?: string;
          poster?: string;
          "auto-rotate"?: boolean | string;
          "auto-rotate-delay"?: string | number;
          "rotation-per-second"?: string;
          "camera-controls"?: boolean | string;
          "shadow-intensity"?: string | number;
          "shadow-softness"?: string | number;
          exposure?: string | number;
          "camera-orbit"?: string;
          "field-of-view"?: string;
          "min-camera-orbit"?: string;
          "max-camera-orbit"?: string;
          "min-field-of-view"?: string;
          "max-field-of-view"?: string;
          loading?: "auto" | "lazy" | "eager";
          "seamless-poster"?: boolean | string;
          "environment-image"?: string;
          style?: React.CSSProperties;
          className?: string;
        },
        HTMLElement
      >;
    }
  }
}

export interface ModelViewerProps {
  modelUrl?: string | null;
  fallbackText?: string;
  color?: string;
  autoRotate?: boolean;
  cameraControls?: boolean;
  shadowIntensity?: number | string;
  exposure?: number | string;
  showGrid?: boolean;
  allowFullscreen?: boolean;
  className?: string;
}

export function ModelViewer({
  modelUrl,
  fallbackText = "A",
  color = "#FFC700",
  autoRotate = true,
  cameraControls = true,
  shadowIntensity = "1",
  exposure = "1.15",
  showGrid = false,
  allowFullscreen = true,
  className,
}: ModelViewerProps) {
  const [isClient, setIsClient] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
    import("@google/model-viewer").catch((err) => {
      console.warn("Failed to load @google/model-viewer:", err);
    });
  }, []);

  const toggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;

    if (!document.fullscreenElement) {
      try {
        if (el.requestFullscreen) {
          await el.requestFullscreen();
        } else if ((el as any).webkitRequestFullscreen) {
          await (el as any).webkitRequestFullscreen();
        }
        setIsFullscreen(true);
      } catch {
        // Fallback to CSS overlay fullscreen
        setIsFullscreen(true);
      }
    } else {
      try {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      } catch {
        // Ignore
      }
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      const isFs = document.fullscreenElement === containerRef.current;
      setIsFullscreen(isFs);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        if (document.fullscreenElement) {
          document.exitFullscreen().catch(() => {});
        }
        setIsFullscreen(false);
      }
    };

    document.addEventListener("fullscreenchange", handleFsChange);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("fullscreenchange", handleFsChange);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen]);

  // Model swap & smooth scale transition states
  const [activeUrl, setActiveUrl] = useState(modelUrl);
  const [activeColor, setActiveColor] = useState(color);
  const [activeFallbackText, setActiveFallbackText] = useState(fallbackText);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const enterTimerRef = useRef<NodeJS.Timeout | null>(null);

  // If modelUrl is stable and only color or fallback changes, update immediately
  useEffect(() => {
    if (modelUrl === activeUrl) {
      setActiveColor(color);
      setActiveFallbackText(fallbackText);
    }
  }, [color, fallbackText, modelUrl, activeUrl]);

  // When modelUrl changes: gracefully scale-out while preserving the previous model's color,
  // then swap activeUrl & activeColor simultaneously once invisible
  useEffect(() => {
    if (modelUrl === activeUrl) return;

    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
      enterTimerRef.current = null;
    }

    setIsTransitioning(true);
    setIsReady(false);

    const exitTimer = setTimeout(() => {
      setActiveUrl(modelUrl);
      setActiveColor(color);
      setActiveFallbackText(fallbackText);
    }, 240);

    return () => clearTimeout(exitTimer);
  }, [modelUrl, activeUrl, color, fallbackText]);

  const handleLoaded = useCallback(() => {
    if (enterTimerRef.current) {
      clearTimeout(enterTimerRef.current);
    }
    // Deliberate 70ms breath to allow the scene to settle before smoothly blooming in
    enterTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setIsReady(true);
    }, 70);
  }, []);

  useEffect(() => {
    return () => {
      if (enterTimerRef.current) {
        clearTimeout(enterTimerRef.current);
      }
    };
  }, []);

  if (!isClient) {
    return (
      <div className={cn("w-full h-full flex items-center justify-center select-none", className)}>
        <span
          className="text-[120px] sm:text-[160px] font-black leading-none drop-shadow-md"
          style={{ color: activeColor }}
        >
          {activeFallbackText}
        </span>
      </div>
    );
  }

  if (!activeUrl) {
    return (
      <div className={cn("w-full h-full flex items-center justify-center select-none", className)}>
        <span
          className="text-[130px] sm:text-[170px] md:text-[200px] font-black leading-none select-none transition-transform duration-300 hover:scale-105"
          style={{
            color: activeColor,
            textShadow: "0 8px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          {activeFallbackText}
        </span>
      </div>
    );
  }

  const isStl = isStlModel(activeUrl);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center overflow-hidden select-none group",
        isFullscreen
          ? "fixed inset-0 z-50 w-screen h-screen bg-background p-0 m-0"
          : "w-full h-full",
        className
      )}
      title="Slide or drag to rotate 3D model"
    >
      {/* 3D Model with Smooth Scale In / Out Transition */}
      <div
        className={cn(
          "w-full h-full flex items-center justify-center transform-gpu transition-all",
          isTransitioning || !isReady
            ? "scale-90 opacity-0 pointer-events-none duration-240 ease-in"
            : "scale-100 opacity-100 duration-600 ease-out"
        )}
        style={{
          transitionTimingFunction: isTransitioning || !isReady
            ? "cubic-bezier(0.4, 0, 1, 1)"
            : "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {isStl ? (
          <StlViewerCanvas
            modelUrl={activeUrl}
            color={activeColor}
            autoRotate={autoRotate}
            showGrid={showGrid}
            onLoaded={handleLoaded}
            className="w-full h-full"
          />
        ) : (
          <model-viewer
            src={activeUrl}
            onLoad={handleLoaded}
            alt={`3D Model for ${activeFallbackText}`}
            camera-controls={cameraControls ? "" : undefined}
            auto-rotate={autoRotate ? "" : undefined}
            rotation-per-second="30deg"
            shadow-intensity={shadowIntensity}
            shadow-softness="0.75"
            exposure={exposure}
            loading="eager"
            style={{ width: "100%", height: "100%" }}
            className="w-full h-full cursor-grab active:cursor-grabbing focus:outline-hidden"
          />
        )}
      </div>

      {/* Fullscreen Action Button */}
      {allowFullscreen && (
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center">
          <button
            type="button"
            onClick={toggleFullscreen}
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Full Screen View"}
            className={cn(
              "size-7 rounded-md flex items-center justify-center transition-all cursor-pointer backdrop-blur-xs border",
              isFullscreen
                ? "bg-white/20 hover:bg-white/30 text-white border-white/20 shadow-xs"
                : "bg-black/25 hover:bg-black/60 text-white/40 hover:text-white border-white/5 hover:border-white/15"
            )}
          >
            {isFullscreen ? (
              <Minimize2Icon className="size-3.5 stroke-[1.5]" />
            ) : (
              <Maximize2Icon className="size-3.5 stroke-[1.5]" />
            )}
          </button>
        </div>
      )}

      {/* Fullscreen Navigation HUD */}
      {isFullscreen && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-white/15 text-[11px] text-white/80 font-mono flex items-center gap-3 pointer-events-none shadow-lg">
          <span>Orbit: Left Click + Drag</span>
          <span>•</span>
          <span>Zoom: Scroll Wheel</span>
          <span>•</span>
          <span>Pan: Right Click + Drag</span>
        </div>
      )}
    </div>
  );
}

export default ModelViewer;
