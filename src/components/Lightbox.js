"use client";

import { useState } from "react";
import Image from "next/image";

export default function Lightbox({ images }) {
  const [activeIndex, setActiveIndex] = useState(null); // FIXED (no TS types)

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {images.map((img, idx) => (
          <div
            key={idx}
            className="bg-white aspect-square flex items-center justify-center p-2 shadow-lg cursor-pointer"
            onClick={() => setActiveIndex(idx)}
          >
            <img
              src={img.url}
              alt={img.alt || "Photo"}
              width={400}
              height={400}
              className="object-contain max-h-full max-w-full"
            />
          </div>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          onClick={() => setActiveIndex(null)}
        >
          <img
            src={images[activeIndex].url}
            alt={images[activeIndex].alt || "Full-size"}
            width={1000}
            height={1000}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
}
