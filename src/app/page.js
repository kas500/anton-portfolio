"use client";

import { useState, useEffect } from "react";

export default function HomePage() {
  const [timeAlive, setTimeAlive] = useState("");

  useEffect(() => {
    const birthDate = new Date("1984-09-23T00:00:00Z");

    const updateTimeAlive = () => {
      const now = new Date();
      const diff = now - birthDate;

      // Convert difference to components
      const years = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
      const daysInYear = diff % (1000 * 60 * 60 * 24 * 365.25);
      const months = Math.floor(daysInYear / (1000 * 60 * 60 * 24 * 30.44));
      const days = Math.floor(
        (daysInYear % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)
      );
      const hours = now.getUTCHours();
      const minutes = now.getUTCMinutes();
      const seconds = now.getUTCSeconds();

      setTimeAlive(
        `${years} years, ${months} months, ${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`
      );
    };

    updateTimeAlive();
    const timer = setInterval(updateTimeAlive, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-white aspect-square max-w-[500px] w-full shadow-lg p-4 flex flex-col items-center justify-center text-center">
        <img
          src="/portrait.jpg"
          alt="Anton Krasnikov"
          className="object-contain max-h-[80%] max-w-full mb-4"
        />
        <p className="text-gray-700 text-sm leading-snug">
          It’s me. I have been alive for <br />
          <span className="font-semibold">{timeAlive}</span>.
        </p>
      </div>
    </div>
  );
}
