"use client";


export default function PlayroomSkeleton() {
  return (
    <section className="w-full min-h-[calc(100vh-80px)] bg-white py-8 sm:py-12 md:py-16 lg:py-20 flex items-center justify-center overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-14 xl:gap-16 items-center">
          {/* Left Column: 3D Model Display & Alphabet Keyboard Skeletons */}
          <div className="flex flex-col items-center w-full mx-auto animate-pulse">
            {/* 3D Model Viewer Card Skeleton */}
            <div className="w-full aspect-square bg-[#F0F0F0] rounded-3xl md:rounded-[2.5rem] relative overflow-hidden flex items-center justify-center shadow-xs">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-gray-200/80 animate-ping opacity-25" />
            </div>

            {/* Keyboard Skeletons */}
            <div className="w-full flex flex-wrap items-center justify-start gap-2 sm:gap-2.5 mt-3 sm:mt-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={`sk-k-${i}`}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-md bg-gray-200 shrink-0"
                />
              ))}
            </div>
          </div>

          {/* Right Column: Details, Word Example, Filter, Actions Skeletons */}
          <div className="flex flex-col justify-center gap-6 sm:gap-7 w-full mx-auto lg:mx-0 animate-pulse">
            {/* Header info (Square Letter Badge, Cases, Sound, Color name) */}
            <div className="flex items-start gap-4 sm:gap-6 md:gap-8">
              <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 lg:w-28 lg:h-28 rounded-xl md:rounded-2xl bg-gray-200 shrink-0" />
              <div className="flex flex-col justify-between self-stretch py-1 gap-3 w-full">
                <div className="flex items-start gap-6 sm:gap-10">
                  <div className="flex flex-col gap-1.5">
                    <div className="w-10 h-7 bg-gray-200 rounded" />
                    <div className="w-16 h-3.5 bg-gray-100 rounded" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="w-10 h-7 bg-gray-200 rounded" />
                    <div className="w-16 h-3.5 bg-gray-100 rounded" />
                  </div>
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gray-200" />
                </div>
                <div className="w-32 h-4 bg-gray-100 rounded" />
              </div>
            </div>

            {/* Example Word Card Skeleton */}
            <div className="w-full bg-[#EAEAEA] rounded-2xl md:rounded-3xl p-5 sm:p-6 md:p-7 flex flex-col gap-2">
              <div className="w-24 h-3.5 bg-gray-300/80 rounded" />
              <div className="flex items-center gap-4 mt-1">
                <div className="w-36 sm:w-48 h-8 bg-gray-300 rounded" />
                <div className="w-8 h-8 rounded-full bg-white/70" />
              </div>
              <div className="w-28 h-3 bg-gray-300/70 rounded mt-1" />
            </div>

            {/* Color Filter Pill Buttons Skeleton */}
            <div className="w-full flex flex-col gap-2.5">
              <div className="w-24 h-4 bg-gray-200 rounded" />
              <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div
                    key={`sk-fl-${i}`}
                    className="w-14 sm:w-16 h-7 sm:h-8 rounded-full bg-gray-200"
                  />
                ))}
              </div>
            </div>

            {/* Random Button & Tip Callout Skeleton */}
            <div className="w-full flex flex-col gap-4 sm:gap-5 mt-2">
              <div className="w-full h-12 sm:h-14 rounded-xl bg-gray-200" />
              <div className="w-full h-11 sm:h-12 rounded-xl bg-yellow-50 border border-yellow-100" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
