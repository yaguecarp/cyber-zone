import { useEffect, useState } from "react";
import Nav from "./Nav";
import Link from "next/link";

export default function Layout({ children }) {
  const [openChat, setOpenChat] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const [games, setGames] = useState([]);
  const [gamesFilter, setGamesFilter] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  console.log("API KEY", process.env.RAWG_API_KEY);

  useEffect(() => {
    fetch(`https://api.rawg.io/api/games?key=${process.env.RAWG_API_KEY}`)
      .then((res) => res.json())
      .then((data) => {
        setGames(data.results);
      });
  }, []);
  console.log(games);

  const handleChange = (e) => {
    setBusqueda(e.target.value);
    filtrar(e.target.value);
    if (e.target.value === "") {
      setGamesFilter([]);
    }
  };

  const filtrar = (terminoBusqueda) => {
    var resultadoBusqueda = games.filter((game) => {
      if (
        game.name
          .toString()
          .toLowerCase()
          .includes(terminoBusqueda.toLowerCase())
      ) {
        return game;
      }
    });
    setGamesFilter(resultadoBusqueda);
  };

  console.log(gamesFilter);

  return (
    <main className="bg-gray-900 min-h-screen w-auto flex">
      <Nav show={showNav} setShow={setShowNav} />
      <div className="w-full ml-72 xs:ml-0 xs:p-4 py-7 bg-gray-900  z-40 fixed  xs:flex xs:justify-center xs:items-start xs:gap-3">
        <div
          className="cursor-pointer md:hidden mt-2"
          onClick={() => setShowNav(!showNav)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 text-white "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="w-full ml-32 flex flex-col justify-center items-center xs:m-0">
          <input
            type="text"
            placeholder="PULSA AQUI PARA BUSCAR 🔍"
            className="font-audiowide bg-gray-800 text-white md:ml-32  md:w-1/2 xs:w-full p-3 rounded-lg border border-primary shadow-sm shadow-gray-400  "
            onChange={(e) => handleChange(e)}
            value={busqueda}
          />
          {gamesFilter.length > 0 && (
            <Link
              href={`/games/${gamesFilter[0].slug}`}
              key={gamesFilter[0].slug}
              className=" md:w-1/2 md:ml-32 p-3 xs:m-0 xs:w-full bg-gray-700 text-white rounded-lg border border-cyan-800  shadow-md cursor-pointer hover:bg-gray-500 shadow-primary"
              onClick={() => {
                setGamesFilter([]);
                setBusqueda("");
              }}
            >
              <div className="flex gap-2 justify-start items-center">
                <img src={gamesFilter[0].background_image} className="w-10 h-10 object-cover rounded-lg" alt="" />
                {gamesFilter[0].name}</div>
            </Link>
          )}
        </div>
      </div>
      <div className="text-white md:ml-72 xs:ml-0 xs:w-auto xs:m-0 w-full p-4 m-2 flex flex-col bg-gray-900">
        <div className="mt-24">{children}</div>
      </div>

      <div className="fixed bottom-4 right-4 cursor-pointer flex items-end gap-3">
        <div
          className={
            (openChat ? "visible " : "hidden ") +
            "bg-gray-700 border-2 p-2 mt-3 border-cyan-700 h-auto w-96 xs:w-auto xs:ml-2 flex flex-col items-center justify-center"
          }
        >
          <h2 className="font-audiowide main-title text-center mt-2">
            CYBER CHAT
          </h2>
          <div className="bg-gray-900 mt-5 w-full h-80 flex justify-around gap-3 p-2">
            <img src="./bot.png" className="w-10 h-10" alt="" />
            <p className="text-gray-400 font-oswald">
              Hola! Mi nombre es CyberBot y puedo ayudarte con dudas puntuales
              que tengas de tus juegos favoritos! <br /> Decime, en que puedo
              ayudar?
            </p>
          </div>
          <input
            type="text"
            className="bg-gray-900 border text-white border-gray-600 w-full py-2 px-2"
            placeholder="Escribe tu pregunta..."
          />
        </div>
        <img
          src="./bot.png"
          alt="chatbot"
          className="hover:shadow-lg hover:shadow-primary hover:-translate-y-3 transition-all p-2 xs:w-16 rounded-full border-2 border-cyan-300 w-20   "
          onClick={() => setOpenChat(!openChat)}
        />
      </div>
    </main>
  );
}
