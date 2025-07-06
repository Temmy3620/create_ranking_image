// components/RankingCard.tsx
import Image from "next/image";

type RankingCardProps = {
  imageUrl: string;
  name: string;
  increment: string;
  rank: number;
};

export default function RankingCard({ imageUrl, name, increment, rank }: RankingCardProps) {
  return (
    <div className="w-[300px] rounded overflow-hidden shadow-md">
      <div className="relative w-full h-[300px]">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover" />
        ) : (
          <div className="bg-gray-700 w-full h-full" />
        )}
      </div>
      <div className="bg-white text-black text-center font-bold text-4xl py-4">{name}</div>
      <div className="bg-gray-900 text-green-400 text-center text-4xl font-extrabold py-10">{increment}人</div>
      <div className="bg-gray-900 text-white text-center text-7xl font-bold py-4">{rank}位</div>
    </div>
  );
}
