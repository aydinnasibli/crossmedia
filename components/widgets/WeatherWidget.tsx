"use client";

import { useEffect, useState } from "react";

export function WeatherWidget() {
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    // Fetch Baku weather
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.4093&longitude=49.8671&current=temperature_2m&timezone=auto"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.current) {
          setTemp(data.current.temperature_2m);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  if (temp === null) return null;

  return (
    <div className="flex items-center gap-1">
      <span className="material-symbols-outlined text-[16px]">
        sunny
      </span>
      <span>{Math.round(temp)}°C</span>
    </div>
  );
}
