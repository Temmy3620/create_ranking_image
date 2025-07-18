"use client";

import { useEffect, useState } from "react";
import RankingCard from "@/components/RankingCard";
import { getChannelImageUrl } from "@/lib/getChannelImageUrl";

type RankingItem = {
  channelId: string;
  name: string;
  increment: string;
  rank: number;
};

type Props = {
  data: RankingItem[];
  format: "video" | "subscribe" | "view";
};

export default function RankingList({ data, format }: Props) {
  const [imageUrls, setImageUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    const fetchImages = async () => {
      const urls: Record<string, string> = {};
      for (const item of data) {
        const url = await getChannelImageUrl(item.channelId);
        if (url) urls[item.channelId] = url;
      }
      setImageUrls(urls);
    };
    fetchImages();
  }, [data]);

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {data.map((item, index) => (
        <RankingCard
          key={index}
          imageUrl={imageUrls[item.channelId] || ""}
          name={item.name}
          increment={item.increment}
          rank={item.rank}
          format={format}
        />
      ))}
    </div>
  );
}
