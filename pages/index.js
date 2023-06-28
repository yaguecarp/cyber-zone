import GameCard from "@/components/GameCard";
import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [games, setGames] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);

  console.log("API KEY", process.env.RAWG_API_KEY);

  useEffect(() => {
    fetch(
      `https://api.rawg.io/api/games?page=${pageNumber}&key=${process.env.RAWG_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0,0)
    fetch(
      `https://api.rawg.io/api/games?page=${pageNumber}&key=${process.env.RAWG_API_KEY}`
    )
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results);
      });
  }, [pageNumber]);
  console.log(games);

  return (
    <>
      {" "}
      <h1 className="text-2xl text-gray-300 font-audiowide ml-3 mt-3">
        Nuevos lanzamientos y trendings
      </h1>
      <div className="flex items-center justify-center h-auto">
        <div className="flex flex-wrap gap-5 p-5 justify-center items-center mt-2 text-gray-300">
          {games.map((game) => (
            // <h1>{game.name}</h1>
            <Link href={`/games/${game.slug}`} key={game.slug}>
              <GameCard
                key={game.id}
                titulo={game.name}
                imagen={game.background_image}
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="flex justify-end">
        {pageNumber > 1 && <button
          onClick={() => setPageNumber(pageNumber - 1)}
          className="mr-20 mb-10 bg-gray-800 px-3 py-2 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
        </button>}
        

        <button
          onClick={() => setPageNumber(pageNumber + 1)}
          className="mr-20 mb-10 bg-gray-800 px-3 py-2 rounded-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-primary"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
