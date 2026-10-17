"use client";

import { useGetProducts3D } from "@/hooks/api/products-3d";
import { ModelViewer } from "@/components/ui/model-viewer";

export default function ThreeModelViewer() {
    const { data: products, isLoading, isError } = useGetProducts3D();

    // Take the 1st alphabet item from the API response array
    const firstProduct = products && products.length > 0 ? products[0] : null;

    if (isLoading) {
        return (
            <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-[#F0F0F0] animate-pulse rounded-2xl md:rounded-[2rem]">
                {/* 3D Model Shape Silhouette Skeleton */}
                <div className="relative flex items-center justify-center">
                    <div className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full bg-gray-300/40" />
                    <div className="absolute w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-3xl bg-gray-300/70" />
                    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-2xl bg-gray-200" />
                </div>

                {/* Ground Shadow Skeleton */}
                <div className="absolute bottom-8 sm:bottom-12 w-36 sm:w-48 md:w-56 h-4 sm:h-5 rounded-full bg-gray-300/40 blur-xs" />
            </div>
        );
    }

    if (isError || !firstProduct) {
        return (
            <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-[#F9FAFB]">
                <span className="text-8xl font-black text-blue-600 drop-shadow-sm select-none">
                    B
                </span>
                <p className="text-xs text-gray-400">3D preview unavailable</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full relative">
            <ModelViewer
                modelUrl={firstProduct.modelURL}
                fallbackText={firstProduct.letter}
                color={firstProduct.colorHex}
                autoRotate
                cameraControls
                shadowIntensity="1"
                exposure="1.15"
            />
        </div>
    );
}