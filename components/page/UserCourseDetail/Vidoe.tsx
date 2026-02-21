"use client";

import { useState, useRef, useCallback } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";
import Link from "next/link";

function formatTime(seconds: number): string {
    if (isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function Video() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [showControls, setShowControls] = useState(false);
    const [started, setStarted] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const videoRef = useRef<HTMLVideoElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    const togglePlay = () => {
        if (!videoRef.current) return;
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
        setStarted(true);
    };

    const toggleMute = () => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    const handleFullscreen = () => {
        if (!videoRef.current) return;
        if (videoRef.current.requestFullscreen) {
            videoRef.current.requestFullscreen();
        }
    };

    const handleTimeUpdate = () => {
        if (!videoRef.current || isDragging) return;
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleLoadedMetadata = () => {
        if (!videoRef.current) return;
        setDuration(videoRef.current.duration);
    };

    const seekTo = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!videoRef.current || !progressRef.current) return;
        const rect = progressRef.current.getBoundingClientRect();
        const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        const newTime = ratio * duration;
        videoRef.current.currentTime = newTime;
        setCurrentTime(newTime);
    }, [duration]);

    const handleProgressMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDragging(true);
        seekTo(e);
    };

    const handleProgressMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDragging) return;
        seekTo(e);
    }, [isDragging, seekTo]);

    const handleProgressMouseUp = () => {
        setIsDragging(false);
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="w-full space-y-4">
            {/* Back to Courses */}
            <Link
                href="/dashboard/my-courses"
                className="inline-flex items-center gap-2 text-[15px] text-gray-600 hover:text-gray-900 transition-colors group"
            >
                <span className="group-hover:-translate-x-1 transition-transform duration-200 inline-block">←</span>
                <span>Back to Courses</span>
            </Link>

            {/* Video Player */}
            <div
                className="relative w-full rounded-[16px] overflow-hidden bg-black aspect-video cursor-pointer select-none"
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => { setShowControls(false); setIsDragging(false); }}
                onClick={togglePlay}
            >
                {/* Video element */}
                <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    poster="https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=960&q=80"
                    onEnded={() => setIsPlaying(false)}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    muted={isMuted}
                >
                    {/* No src — acts as a poster-only display until a real video URL is provided */}
                </video>

                {/* Dark overlay */}
                <div
                    className={`absolute inset-0 transition-all duration-300 ${started && isPlaying && !showControls
                            ? "bg-transparent"
                            : "bg-black/30"
                        }`}
                />

                {/* Center Play / Pause Button */}
                {(!started || !isPlaying || showControls) && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[64px] h-[64px] bg-white rounded-full flex items-center justify-center shadow-lg">
                            {isPlaying ? (
                                <Pause
                                    size={26}
                                    strokeWidth={2.5}
                                    className="text-gray-900 fill-gray-900"
                                />
                            ) : (
                                <Play
                                    size={26}
                                    strokeWidth={2.5}
                                    className="text-gray-900 fill-gray-900 translate-x-[2px]"
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* Bottom Controls Bar */}
                <div
                    className={`absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8 flex flex-col gap-2.5 transition-opacity duration-300 bg-linear-to-t from-black/60 to-transparent ${showControls || !started ? "opacity-100" : "opacity-0"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Progress Bar */}
                    <div
                        ref={progressRef}
                        className="w-full h-1.5 bg-white/30 rounded-full cursor-pointer group/progress relative"
                        onMouseDown={handleProgressMouseDown}
                        onMouseMove={handleProgressMouseMove}
                        onMouseUp={handleProgressMouseUp}
                    >
                        {/* Filled track */}
                        <div
                            className="h-full bg-white rounded-full relative transition-all duration-100"
                            style={{ width: `${progress}%` }}
                        >
                            {/* Scrubber thumb */}
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity" />
                        </div>
                    </div>

                    {/* Time display + right controls */}
                    <div className="flex items-center justify-between">
                        {/* Timestamp */}
                        <span className="text-white text-[13px] font-medium tabular-nums tracking-wide">
                            {formatTime(currentTime)}
                            <span className="text-white/50 mx-1">/</span>
                            {formatTime(duration)}
                        </span>

                        {/* Right side: Mute + Fullscreen */}
                        <div className="flex items-center gap-4">
                            <button
                                onClick={toggleMute}
                                className="text-white hover:text-gray-200 transition-colors"
                                aria-label={isMuted ? "Unmute" : "Mute"}
                            >
                                {isMuted ? (
                                    <VolumeX size={20} strokeWidth={2} />
                                ) : (
                                    <Volume2 size={20} strokeWidth={2} />
                                )}
                            </button>

                            <button
                                onClick={handleFullscreen}
                                className="text-white hover:text-gray-200 transition-colors"
                                aria-label="Fullscreen"
                            >
                                <Maximize size={20} strokeWidth={2} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}