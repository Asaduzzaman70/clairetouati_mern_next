"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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
  className,
}: ModelViewerProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    import("@google/model-viewer").catch((err) => {
      console.warn("Failed to load @google/model-viewer:", err);
    });
  }, []);

  if (!isClient) {
    return (
      <div className={cn("w-full h-full flex items-center justify-center select-none", className)}>
        <span
          className="text-[120px] sm:text-[160px] font-black leading-none drop-shadow-md"
          style={{ color }}
        >
          {fallbackText}
        </span>
      </div>
    );
  }

  if (!modelUrl) {
    return (
      <div className={cn("w-full h-full flex items-center justify-center select-none", className)}>
        <span
          className="text-[130px] sm:text-[170px] md:text-[200px] font-black leading-none select-none transition-transform duration-300 hover:scale-105"
          style={{
            color,
            textShadow: "0 8px 16px rgba(0,0,0,0.12), 0 2px 4px rgba(0,0,0,0.08)",
          }}
        >
          {fallbackText}
        </span>
      </div>
    );
  }

  const isStl = isStlModel(modelUrl);

  if (isStl) {
    return (
      <div
        className={cn(
          "w-full h-full relative flex items-center justify-center overflow-hidden select-none",
          className
        )}
        title="Slide or drag to rotate 3D model"
      >
        <StlViewerCanvas
          modelUrl={modelUrl}
          color={color}
          autoRotate={autoRotate}
          showGrid={showGrid}
          className="w-full h-full"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "w-full h-full relative flex items-center justify-center overflow-hidden select-none",
        className
      )}
      title="Slide or drag to rotate 3D model"
    >
      <model-viewer
        key={modelUrl}
        src={modelUrl}
        alt={`3D Model for ${fallbackText}`}
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
    </div>
  );
}

export default ModelViewer;
