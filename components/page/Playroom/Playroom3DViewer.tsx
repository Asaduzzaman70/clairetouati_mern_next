"use client";

import React from "react";
import { ModelViewer } from "@/components/ui/model-viewer";
import { LetterItem } from "./playroomData";

interface Playroom3DViewerProps {
  currentLetter: LetterItem;
}

export default function Playroom3DViewer({ currentLetter }: Playroom3DViewerProps) {
  return (
    <ModelViewer
      key={currentLetter.letter || currentLetter.id}
      modelUrl={currentLetter.modelURL}
      fallbackText={currentLetter.letter}
      color={currentLetter.colorHex}
      autoRotate
      cameraControls
      shadowIntensity="1"
      exposure="1.15"
    />
  );
}
