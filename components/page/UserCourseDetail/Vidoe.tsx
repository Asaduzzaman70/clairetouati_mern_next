"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function Video() {
    return (
        <div className="w-full space-y-6">
            {/* Back to Courses */}
            <Link
                href="/dashboard/my-courses"
                className="inline-flex items-center gap-2 text-base text-[#697079] hover:text-gray-900 transition-colors group"
            >
                <ArrowLeft className="size-5" />
                <span>Back to Courses</span>
            </Link>

            {/* Video Player */}
            <div
                className="relative w-full overflow-hidden aspect-video cursor-pointer select-none"
            >
                {/* Video element */}
                <video
                    className="w-full h-full object-cover"
                    src="/video.mp4"
                    poster="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=960&q=80"
                    playsInline
                    controls
                    controlsList="nodownload noplaybackrate noremoteplayback"
                    disablePictureInPicture
                    onContextMenu={(e) => e.preventDefault()}
                >
                </video>
            </div>
        </div>
    );
}