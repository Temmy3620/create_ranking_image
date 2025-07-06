// app/api/screenshot/route.tsx
import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function POST(req: Request) {
  const { data }: { data: { name: string; increment: string; rank: number }[] } = await req.json();

  return new ImageResponse(
    (
      <div
        style={{
          width: "1280px",
          height: "720px",
          backgroundColor: "black",
          color: "white",
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          alignItems: "center",
          justifyContent: "center",
          padding: "32px",
          fontSize: 28,
          fontFamily: "sans-serif",
        }}
      >
        {data.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#1a1a1a",
              padding: "12px 24px",
              borderRadius: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "200px",
            }}
          >
            <div>{item.rank}位</div>
            <div style={{ fontSize: 24 }}>{item.name}</div>
            <div style={{ color: "lime" }}>{item.increment}人</div>
          </div>
        ))}
      </div>
    ),
    {
      width: 1280,
      height: 720,
    }
  );
}
