// src/components/HomeSkeleton.tsx
"use client";

const HomeSkeleton = () => {
  return (
    <div className="flex min-h-screen overflow-hidden animate-pulse">
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <div className="flex-1 overflow-y-auto p-8">
          {/* Image skeleton */}
          <div className="w-full h-[400px] bg-gray-200 rounded-xl mb-8" />

          {/* Title skeleton */}
          <div className="h-12 bg-gray-200 rounded-lg w-3/4 mb-8" />

          {/* Content skeleton - Paragraphs */}
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-3/4" />
          </div>

          {/* Additional content blocks */}
          <div className="mt-8 space-y-6">
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-full" />
              <div className="h-4 bg-gray-200 rounded w-4/6" />
            </div>

            <div className="space-y-4">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
              <div className="h-4 bg-gray-200 rounded w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSkeleton;
