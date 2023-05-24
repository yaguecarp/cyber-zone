import Nav from "./Nav";

export default function Layout({ children }) {
  return (
    <main className="bg-gray-900 min-h-screen flex">
      <Nav />

      <div className="text-white ml-80  w-full p-4 m-2 flex flex-col">
        <input
          type="text"
          placeholder="PULSA AQUI PARA BUSCAR 🔍"
          className="font-audiowide bg-gray-800 p-3 rounded-lg border border-primary shadow-sm shadow-gray-400  "
        />
        <div className="mt-5">{children}</div>
      </div>
      {/* <div className="min-h-screen flex justify-between">
        <Nav show={false}/>

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
      </div> */}
    </main>
  );
}
