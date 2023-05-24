import GameCard from "@/components/GameCard";
import Layout from "@/components/Layout";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [games, setGames] = useState([]);

  console.log("API KEY", process.env.RAWG_API_KEY);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`)
      .then((res) => res.json())
      .then((data) => setGames(data.results));
  }, []);
  console.log(games);

  return (
    <Layout>
      <h1 className="text-2xl text-gray-300 font-audiowide ml-3 mt-3">Nuevos lanzamientos y trendings</h1>
      <div className="flex items-center justify-center h-auto">
        <div className="flex flex-wrap gap-5 p-5 justify-center items-center mt-2 text-gray-300">
          {games.map((game) => (
            // <h1>{game.name}</h1>
            <GameCard key={game.name} titulo={game.name} imagen={game.background_image} />
          ))}
        </div>
      </div>
    </Layout>
  );
}
