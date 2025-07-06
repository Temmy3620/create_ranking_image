"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import RankingList from "@/components/RankingList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

type RankingItem = {
  channelId: string;
  name: string;
  increment: string;
  rank: number;
};


export default function Home() {
  const [inputValue, setInputValue] = useState("");
  const [rankingData, setRankingData] = useState<RankingItem[]>([]);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleLoadData = () => {
    try {
      const parsed = JSON.parse(inputValue);
      if (Array.isArray(parsed)) {
        setRankingData(parsed);
      } else {
        alert("JSON should be an array");
      }
    } catch (e) {
      alert("Invalid JSON");
    }
  };

  const handleDownload = async () => {
    if (!imageRef.current) return;

    try {
      const image = await toPng(imageRef.current);
      const link = document.createElement("a");
      link.href = image;
      link.download = "ranking_image.png";
      link.click();
    } catch (error) {
      console.error("Image generation error:", error);
      alert("Error generating image: " + (error instanceof Error ? error.message : "Unknown error"));
    }
  };

  return (
    <div className="grid grid-rows-[auto_1fr] items-center justify-items-center min-h-screen p-8 pb-20 gap-8 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <textarea
        placeholder="Paste JSON data here"
        className="w-full max-w-2xl h-40 p-4 border border-gray-500 rounded bg-gray-900 text-white"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        onClick={handleLoadData}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Load Ranking Data
      </button>
      {rankingData.length > 0 && (
        <button
          onClick={handleDownload}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Download Image
        </button>
      )}
      <main className="flex flex-col gap-[32px] items-center sm:items-start w-full">
        {rankingData.length > 0 && (
          <div
            ref={imageRef}
            className="bg-black overflow-x-auto overflow-y-hidden whitespace-nowrap flex flex-row"
          >
            <RankingList data={rankingData} />
          </div>
        )}
      </main>
    </div>
  );
}
