const YOUTUBE_API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY!;

export async function getChannelImageUrl(channelId: string): Promise<string | null> {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=${YOUTUBE_API_KEY}`
  );
  const data = await res.json();
  console.log(data?.items?.[0]?.snippet?.thumbnails?.high?.url);
  return data?.items?.[0]?.snippet?.thumbnails?.high?.url ?? null;
}
