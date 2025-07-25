"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

function getOptimizedUrl(url, width) {
  return url.replace("/upload/", `/upload/f_auto,q_auto,w_${width}/`);
}

export default function Lightbox({ images }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  // Preload large images
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
            className="bg-white aspect-square flex items-center justify-center p-2 shadow-lg cursor-pointer hover:scale-[1.02] transition-transform"
            onClick={() => {
              setActiveIndex(idx);
              setLoading(true); // reset loader when switching images
            }}
          >
            <Image
              src={getOptimizedUrl(img.url, 600)}
              alt={img.alt || "Photo"}
              width={400}
              height={400}
              className="object-contain max-h-full max-w-full"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {activeIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 cursor-zoom-out"
          onClick={() => setActiveIndex(null)}
        >
          {/* Spinner while loading */}
          {loading && (
            <div className="absolute w-12 h-12 border-4 border-white/40 border-t-white animate-spin rounded-full"></div>
          )}

          <Image
            src={getOptimizedUrl(images[activeIndex].url, 1600)}
            alt={images[activeIndex].alt || "Full-size"}
            width={1200}
            height={800}
            className={`max-h-[90vh] max-w-[90vw] object-contain transition-opacity duration-500 ${
              loading ? "opacity-0" : "opacity-100"
            }`}
            priority
            onLoadingComplete={handleImageLoad}
          />
        </div>
      )}
    </>
  );
}
