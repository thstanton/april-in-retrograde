import FoodCard from "./components/FoodCard";
import PlayListCard from "./components/PlaylistCard";

export default async function Home() {

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <PlayListCard />
      <FoodCard />
    </main>
  );
}
