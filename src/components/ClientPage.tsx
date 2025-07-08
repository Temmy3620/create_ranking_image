"use client";

import { useState, useRef } from "react";
import { toPng } from "html-to-image";
import RankingList from "@/components/RankingList";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label"
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group"

type RankingItem = {
  channelId: string;
  name: string;
  increment: string;
  rank: number;
};

export default function ClientPage() {
  const [inputValue, setInputValue] = useState("");
  const [radioValue, setRadioValue] = useState("subscribe");
  const [rankingData, setRankingData] = useState<RankingItem[]>([]);
  const imageRef = useRef(null);

  const handleLoadData = () => {
    try {
      const parsed = JSON.parse(inputValue);
      if (Array.isArray(parsed)) {
        setRankingData(parsed);
      } else {
        alert("JSON should be an array");
      }
    } catch {
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
      if (error instanceof Error) {
        alert("Error generating image: " + error.message);
      } else {
        alert("Unknown error");
      }
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
      <RadioGroup
        value={radioValue}
        onValueChange={setRadioValue}
        className="flex gap-4 py-4">
        <div className="flex items-center gap-3">
          <RadioGroupItem value="subscribe" id="r1" />
          <Label htmlFor="r1">Subscribe</Label>
        </div>
        <div className="flex items-center gap-3">
          <RadioGroupItem value="view" id="r2" />
          <Label htmlFor="r2">View</Label>
        </div>
      </RadioGroup>
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
      <main className="flex flex-col gap-[32px] items-center sm:items-start w-160">
        {rankingData.length > 0 && (
          <ScrollArea className="w-full rounded-md border whitespace-nowrap">
            <div ref={imageRef} className="flex w-max space-x-4 p-4 bg-black">
              <div className="w-60 h-40 bg-black rounded-lg" />
              <div className="w-60 h-40 bg-black rounded-lg" />
              <div className="w-60 h-40 bg-black rounded-lg" />
              <div className="w-60 h-40 bg-black rounded-lg" />
              {rankingData
                .slice()
                .sort((a, b) => b.rank - a.rank)
                .map((item, index) => (
                  <div key={`${item.channelId}-${index}`} className="shrink-0">
                    <RankingList data={[item]} format={radioValue as "view" | "subscribe"} />
                  </div>
                ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </main>
    </div>
  );
}
