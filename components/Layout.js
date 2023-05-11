export default function Layout({ children }) {
  return (
    <main className="bg-gray-900 min-h-screen border">
      <div className="min-h-screen flex justify-between ">
        {/* NAV */}
        <aside className=" h-full w-72 p-1 fixed top-0 left-0 bg-gray-900 ">
          <h1 className="cursor-pointer select-none text-3xl font-oswald text-teal-500 bg-gray-800 text-center rounded-xl  font-bold py-4 m-4">
            CYBER ZONE
          </h1>
          <nav>
            <ul className="flex flex-col items-start ml-5 mt-10 text-xl font-oswald gap-10">
              <li>Inicio</li>
              <li>Analisis</li>
              <li>Nuevos Lanzamientos</li>
              <li>TOP</li>
              <li>Todos los juegos</li>
              <li>Plataformas</li>
              <li>Generos</li>
            </ul>
          </nav>
        </aside>
        {/* FIN NAV */}

        <section className="border border-gray-700 ml-72 w-3/5">
          <div className="w-full border-b border-gray-500 h-24 flex  items-center ">
            <input
              className="w-1/2 bg-gray-800 py-2 px-3 ml-5 text-gray-300 text-3xl"
              placeholder="Buscar..."
            />
          </div>
          <div>{children}</div>
        </section>

        <aside className=" h-full w-auto    ">
          <h1 className="text-gray-200 text-center text-xl mt-24 ">
            Utiliza nuestro ChatBot de ayuda 🙌
          </h1>
          <div className="mt-5 flex flex-col items-center justify-center p-2">
            <div className="bg-gray-600 w-full h-96 text-gray-200 text-center">
              {" "}
              Escribe una pregunta para comenzar...
            </div>
            <div className="w-full p-2">
              <input
                className="w-full mt-5 py-2 px-2 rounded-xl bg-gray-500 text-gray-300"
                type="text"
                placeholder="prompt..."
              />
              <button className="text-center w-full rounded-xl px-3 py-2 bg-gray-500 text-gray-200 mt-5">
                Enviar
              </button>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
