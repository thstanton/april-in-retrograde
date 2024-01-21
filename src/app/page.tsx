import PlayListCard from "./components/PlaylistCard";
import { getToken } from "./lib/spotify/spotify";

export default async function Home() {
  await getToken()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PlayListCard />
    </main>
  );
}
