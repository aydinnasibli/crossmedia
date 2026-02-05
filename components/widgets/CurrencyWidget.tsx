"use client";

import { useEffect, useState } from "react";

export function CurrencyWidget() {
  // Default values from design
  const [rates, setRates] = useState([
    { code: "USD", name: "ABŞ Dolları", value: "1.7000" },
    { code: "EUR", name: "Avro", value: "1.8540" },
    { code: "RUB", name: "Rusiya Rublu", value: "0.0190" },
    { code: "TRY", name: "Türk Lirəsi", value: "0.0590" },
  ]);

  useEffect(() => {
    // Try to fetch real rates
    // Base USD. USD to AZN is ~1.7
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((res) => res.json())
      .then((data) => {
        const usdToAzn = data.rates.AZN || 1.7;
        const usdToEur = data.rates.EUR;
        const usdToRub = data.rates.RUB;
        const usdToTry = data.rates.TRY;

        // Calculate rates in AZN
        // 1 USD = 1.7 AZN
        // 1 EUR = (1/usdToEur) * 1.7 AZN

        const eurToAzn = (1 / usdToEur) * usdToAzn;
        const rubToAzn = (1 / usdToRub) * usdToAzn;
        const tryToAzn = (1 / usdToTry) * usdToAzn;

        setRates([
          { code: "USD", name: "ABŞ Dolları", value: usdToAzn.toFixed(4) },
          { code: "EUR", name: "Avro", value: eurToAzn.toFixed(4) },
          { code: "RUB", name: "Rusiya Rublu", value: rubToAzn.toFixed(4) },
          { code: "TRY", name: "Türk Lirəsi", value: tryToAzn.toFixed(4) },
        ]);
      })
      .catch((err) => console.error("Currency fetch failed", err));
  }, []);

  return (
    <div className="bg-primary text-white rounded-xl p-5 shadow-lg">
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <span className="material-symbols-outlined">currency_exchange</span>{" "}
        Məzənnə
      </h3>
      <div className="space-y-3">
        {rates.map((rate, index) => (
          <div
            key={rate.code}
            className={`flex justify-between items-center pb-2 ${
              index !== rates.length - 1 ? "border-b border-white/20" : ""
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="font-bold">{rate.code}</span>
              <span className="text-xs opacity-80">{rate.name}</span>
            </div>
            <span className="font-mono font-bold">{rate.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
