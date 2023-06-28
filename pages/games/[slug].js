import { UserContext } from "@/components/UserContext";
import Link from "next/link";
import { use, useContext, useEffect, useState } from "react";

export default function GamePage({
  data,
  dataSteamsIDS,
  gameSteam,
  steamInfoArray,
  gameInfo,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [steamsIDs, setSteamsIDs] = useState([]);
  const [gameSteamInfo, setGameSteamInfo] = useState(
    gameInfo[Object.keys(gameInfo)[0]]?.data || null
  );
  // console.log(data);
  // console.log("STEAM ", steamInfoArray[0][Object.keys(steamInfoArray[0])[0]].success);
  const { userType } = useContext(UserContext);
  console.log(gameInfo[Object.keys(gameInfo)[0]].data);

  let ARScurrency = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  });

  return (
    <>
      <div className=" border border-gray-600 shadow-md shadow-primary  p-4 flex flex-col font-audiowide">
        <div className="flex md:flex-row xs:flex-col h-96 xs:h-auto">
          <div className=" p-2 w-full md:w-1/2 h-auto">
            <img
              src={data.background_image}
              className=" border-gray-700 w-full h-full object-cover mb-5 shadow-md shadow-cyan-700 "
              alt=""
            />
          </div>
          <div className=" flex flex-col justify-start flex-1 gap-10 ">
            <h1 className="text-center text-4xl">{data.name}</h1>

            <div className="flex flex-wrap justify-start items-center ml-5 mt-10 md:flex-row md:gap-1 xs:flex-col xs:gap-5">
              <h2 className="border-b border-primary text-2xl">
                Plataformas:{" "}
              </h2>
              {data.parent_platforms?.map((plataforma) => (
                <h3
                  className="text-white ml-2 text-xl"
                  key={plataforma.platform.name}
                >
                  {plataforma.platform.name}
                </h3>
              ))}
            </div>
            <div className="flex items-center ml-5 mt-5">
              <h2 className="mr-3 text-2xl border-b border-primary">
                Valoracion:
              </h2>
              {[...Array(5)].map((e, i) => (
                <svg
                  key={i}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className={`w-6 h-6 text-xl ${
                    parseInt(data.rating) > i || data.rating > 4.5
                      ? "text-primary"
                      : "text-gray-600"
                  }`}
                >
                  <path
                    fillRule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                    clipRule="evenodd"
                  />
                </svg>
              ))}
            </div>
          </div>
        </div>
        <div className="xs:mt-5 flex flex-wrap">
          <div className="flex p-2 items-baseline">
            <h2 className="text-lg text-cyan-700">Descripcion:</h2>
            <h3
              className="ml-2 text-sm"
              dangerouslySetInnerHTML={{
                __html: gameSteamInfo?.short_description,
              }}
            ></h3>
          </div>
          <div className="flex p-2 items-baseline">
            <h2 className="text-lg text-cyan-700">Genero:</h2>
            <h3 className="ml-2 text-sm">
              {data.genres?.map((genre) => `${genre.name}, `)}
            </h3>
          </div>
          <div className="flex p-2 items-baseline">
            <h2 className="text-lg text-cyan-700">Publicado en:</h2>
            <h3 className="ml-2 text-sm">{data.released}</h3>
          </div>
          <div className="flex p-2 items-baseline">
            <h2 className="text-lg text-cyan-700">Edad minima recomendada:</h2>
            <h3 className="ml-2 text-sm">{gameSteamInfo?.required_age}</h3>
          </div>

          {userType === "GAMER" && (
            <>
              <div className="flex p-2 items-baseline">
                <h2 className="text-lg text-cyan-700">Horas de juego:</h2>
                <h3 className="ml-2 text-sm">{data.playtime}</h3>
              </div>
              <div className="flex p-2 items-baseline">
                <h2 className="text-lg text-cyan-700">Cantidad de logros:</h2>
                <h3 className="ml-2 text-sm">
                  {gameSteamInfo?.achievements.total}
                </h3>
              </div>

              <div className="flex p-2 items-baseline">
                <h2 className="text-lg text-cyan-700">DLCs: </h2>
                <h3 className="ml-2 text-sm">{gameSteamInfo?.dlc?.length}</h3>
              </div>
              <div className="flex p-2 items-baseline">
                <h2 className="text-lg text-cyan-700">Free to play: </h2>
                <h3 className="ml-2 text-sm">
                  {gameSteamInfo?.is_free ? "SI" : "NO"}
                </h3>
              </div>

              <div className="flex justify-center gap-10 w-full h-auto p-2 ">
                <div className="w-1/2">
                  <h2
                    className="text-md text-cyan-700"
                    dangerouslySetInnerHTML={{
                      __html: gameSteamInfo?.pc_requirements.minimum,
                    }}
                  ></h2>
                </div>
                <div className="w-1/2">
                  <h2
                    className="text-md text-cyan-700"
                    dangerouslySetInnerHTML={{
                      __html: gameSteamInfo?.pc_requirements.recommended,
                    }}
                  ></h2>
                </div>
              </div>
              <div className="flex p-2 items-baseline">
                <h2 className="text-lg text-cyan-700">Idiomas soportados:</h2>
                <h3
                  className="ml-2 text-sm"
                  dangerouslySetInnerHTML={{
                    __html: gameSteamInfo?.supported_languages,
                  }}
                ></h3>
              </div>
            </>
          )}

          <div className="flex p-2 items-baseline">
            <h2 className="text-lg text-cyan-700">Etiquetas:</h2>
            <h3 className="ml-2 text-sm">
              {data.tags?.map((tag) => `${tag.name}, `)}
            </h3>
          </div>
          <div className="flex p-2 items-baseline">
            <h2 className="text-lg text-cyan-700">Desarrollador:</h2>
            <h3 className="ml-2 text-sm">
              {data.publishers?.map((p) => `${p.name}`)}
            </h3>
          </div>
        </div>
        <div className="p-2 flex justify-between">
          <div>
            <h2 className="text-cyan-700 text-lg">
              Disponible para comprar en:{" "}
            </h2>
            <div className="flex flex-col">
              {data.stores?.map((store) => (
                <a
                  key={store.store.name}
                  href={"https://" + store.store.domain}
                  target="_blank"
                >
                  {store.store.name}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className=" flex items-center justify-center">
          <h2 className=" text-cyan-700 text-lg text-center border border-cyan-900 shadow-sm shadow-primary w-fit p-3">
            Precio aproximado en Steam: <br />
            <span className="text-white text-2xl ">
              {gameSteamInfo?.is_free
                ? "GRATIS"
                : gameSteamInfo?.price_overview
                ? ARScurrency.format(
                    (gameSteamInfo?.price_overview?.final / 100) * 1.75
                  )
                : "No se pudo obtener informacion, lo lamentos."}
            </span>
          </h2>
        </div>
        <Link
          href="../precios-argentina"
          className="flex items-center justify-center"
        >
          <button
            className="text-center text-sm text-primary mt-5"
            onClick={() => setOpenModal(!openModal)}
          >
            Como se calculan los precios en Argentina?
          </button>
        </Link>
      </div>
    </>
  );
}

export const getServerSideProps = async (query) => {
  const res = await fetch(
    `https://api.rawg.io/api/games/${query.params.slug}?key=${process.env.RAWG_API_KEY}`
  );
  const data = await res.json();

  const resSteamIDS = await fetch(
    `http://api.steampowered.com/ISteamApps/GetAppList/v0001/`
  );
  const dataSteamsIDS = await resSteamIDS.json();

  const gameSteam = dataSteamsIDS.applist.apps.app.filter(
    (game) => game.name === data.name
  );

  const promisesArray = await Promise.all(
    gameSteam.map(async (item) => {
      return (
        await fetch(
          `https://store.steampowered.com/api/appdetails?appids=${item.appid}&cc=ar&l=es`
        )
      ).json();
    })
  );

  const gameInfo = promisesArray.filter(
    (item) => item[Object.keys(item)[0]].success === true
  );

  return {
    props: {
      data,
      dataSteamsIDS: dataSteamsIDS.applist.apps.app,
      gameSteam,
      steamInfoArray: promisesArray,
      gameInfo: JSON.parse(JSON.stringify(gameInfo[0])),
    },
  };
};
