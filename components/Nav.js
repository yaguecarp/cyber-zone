import Link from "next/link";


export default function Nav({ show }) {
  return (
    <aside
      className={
        "left-0 top-0 text-gray-500 fixed w-1/6  bg-gray-900 h-full border-r border-primary "
      }
    >
      <Link href={"/"}>
        <div className="w-auto h-auto m-auto flex flex-col justify-center items-center ">
          <img src='./logo_sin_fondo.png' alt="logo" className="w-24 h-24" />
          <h1 className="main-title">CYBERZONE</h1>
        </div>
      </Link>

      <nav className=" mt-10 p-2">
        <ul className="flex flex-col items-center text-xl font-audiowide gap-7">
          <li>NOVEDADES</li>
          <li>FAVORITOS</li>
          <li>GENEROS</li>
          <li>NOSOTROS</li>
          <li>CONTACTO</li>
          <li>APOYANOS</li>
        </ul>
      </nav>

      <div className="border-t border-primary flex items-center p-4 justify-center gap-3 absolute bottom-0 w-full">
        <div className="border border-primary rounded-full w-16 h-16 overflow-hidden">
          <img src="./Malicki.png" alt="" className="w-auto" />
        </div>
        <div className="font-audiowide">
          <h2 className="text-white">XxxFREIJOxxX</h2>
          <div>
            <h3 className="text-xs text-primary">Nivel 8</h3>
            <div className="flex">
              <div className="bg-primary w-10 h-1"></div>
              <div className="bg-gray-400 w-28 h-1"></div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
