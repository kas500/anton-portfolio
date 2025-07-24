"use client";

import { useState, useEffect } from "react";
import Lightbox from "./Lightbox";

export default function Gallery({ category }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetch(`/api/images?category=${category}`)
      .then((res) => res.json())
      .then(setImages);
  }, [category]);

  return (
    <main className="flex-1 p-6 overflow-auto">
      <Lightbox images={images} />
    </main>
  );
}
