import Link from "next/link";
import { useState } from "react";

export default function GamePage({ data }) {
  const [openModal, setOpenModal] = useState(false);
  console.log(data);

  return (
    <>
      <div className=" border border-gray-600 shadow-md shadow-primary  p-4 flex flex-col font-audiowide">
        <div className="flex md:flex-row xs:flex-col">
          <div className=" p-2 w-full md:w-1/3">
            <img
              src={data.background_image}
              className=" border-gray-700 w-full h-auto mb-5 shadow-md shadow-cyan-700 "
              alt=""
            />
          </div>
          <div className=" flex flex-col justify-start flex-1 gap-10">
            <h1 className="text-center text-4xl">{data.name}</h1>

            <div className="flex justify-start items-center ml-5 mt-10 xs:flex-col xs:gap-5">
              <h2 className="border-b border-primary text-2xl">
                Plataformas:{" "}
              </h2>
              {data.parent_platforms?.map((plataforma) => (
                <h3 className="text-white ml-2 text-xl" key={plataforma.platform.name}>
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
        <div className="xs:mt-5">
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
          <div className="flex p-2 items-baseline">
            <h2 className="text-lg text-cyan-700">Publicado en:</h2>
            <h3 className="ml-2 text-sm">{data.released}</h3>
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
          {/* <div className="border w-1/2 h-auto p-5">
            <div className="flex justify-between items-center">
                <span className="text-gray-400">Precio base</span>
                <span className="text-gray-400">$765,24</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm mt-2">Percepcion de Ganancias y Bienes Personales <br /> RG AFIP N 5232/2022 </span>
                <span className="text-gray-400">$344,25</span>
            </div>
            <div className="flex justify-between items-center">
                <span className="text-gray-400 text-sm mt-2">Ley Impuesto Pais <br /> RG AFIP N 4659/2020</span>
                <span className="text-gray-400">$229,50</span>
            </div>
            <hr className="mt-3 mb-3"/>
            <div className="flex justify-between items-center">
                <span className="text-gray-200">TOTAL APROXIMADO CON IMPUESTOS</span>
                <span className="text-gray-200">$1.338,75</span>
            </div>
          </div> */}
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

  return {
    props: { data },
  };
};
