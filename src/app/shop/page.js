"use client";
import Image from "next/image";
import Link from "next/link";

const mockProducts = [
  {
    id: 1,
    title: "Forest Canvas",
    price: "$120",
    image: "/mock/forest.jpg",
    url: "https://www.etsy.com/shop/YourShopName",
  },
  {
    id: 2,
    title: "Ocean Canvas",
    price: "$140",
    image: "/mock/ocean.jpg",
    url: "https://www.etsy.com/shop/YourShopName",
  },
];

export default function ShopPage() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Shop My Prints</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {mockProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white aspect-square p-4 shadow-lg flex flex-col items-center justify-between"
          >
            <img
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="object-contain max-h-full"
            />
            <h2 className="mt-4 text-xl">{product.title}</h2>
            <p className="mt-2 text-gray-700">{product.price}</p>
            <Link
              href={product.url}
              target="_blank"
              className="mt-4 px-4 py-2 bg-black text-white hover:bg-gray-700"
            >
              Buy Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
