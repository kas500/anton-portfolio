"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function getOptimizedUrl(url, width) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

export default function Lightbox({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // Preload large images for smoother transitions
  useEffect(() => {
    images.forEach((img) => {
      const preload = new window.Image();
      preload.src = getOptimizedUrl(img.url, 1600);
    });
  }, [images]);

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="bg-white aspect-square flex flex-col items-center justify-between p-2 shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => {
              setActiveIndex(idx);
              setLoading(true);
            }}
          >
            {/* Image */}
            <div className="flex-1 flex items-center justify-center w-full">
              <Image
                src={getOptimizedUrl(img.url, 600)}
                alt={img.alt || "Photo"}
                width={400}
                height={400}
                className="object-contain max-h-full max-w-full"
                loading="lazy"
              />
            </div>

            {/* Always show a small label below the thumbnail */}
            {/* <div className="mt-2 text-xs text-gray-600 font-medium">
              Feeling
            </div> */}
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-50 cursor-zoom-out p-4"
          onClick={() => setActiveIndex(null)}
        >
          {/* Spinner while loading */}
          {loading && (
            <div className="absolute w-12 h-12 border-4 border-white/40 border-t-white animate-spin rounded-full"></div>
          )}

          {/* Full-size Image */}
          <Image
            src={getOptimizedUrl(images[activeIndex].url, 1600)}
            alt={images[activeIndex].alt || "Full-size"}
            width={1200}
            height={800}
            className={`max-h-[70vh] max-w-[90vw] object-contain transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            priority
            onLoadingComplete={handleImageLoad}
          />

          {/* Dynamic feeling text (from Cloudinary metadata) */}
          {/* {!loading && (
            <div
              className="bg-white text-black mt-4 p-4 shadow-md max-w-[600px] text-center rounded transition-opacity duration-500"
              onClick={(e) => e.stopPropagation()} // prevent close on click
            >
              <p className="text-base mb-3">
                {images[activeIndex].feeling ||
                  "This image carries a quiet emotion of presence."}
              </p>
              <a
                href="#"
                className="text-blue-600 underline hover:text-blue-800"
                onClick={(e) => {
                  e.stopPropagation();
                  alert("Donation link coming soon!");
                }}
              >
                If this resonates, tip me $1.
              </a>
            </div>
          )} */}
        </div>
      )}
    </>
  );
}
