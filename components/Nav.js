import Link from "next/link";
import { useState } from "react";

export default function Nav({ show, setShow }) {
  return (
    <>
      <aside
        className={
          (show
            ? " xs:w-full xs:mt-10  md:mt-0 md:block md:w-auto md:bg-white"
            : " xs:hidden md:block ") +
          "left-0 top-0 xs:z-30 md:z-50 text-gray-500 fixed w-auto p-5  bg-gray-900 h-full border-r border-primary"
        }
      >
        <Link href={"/"}>
          <div onClick={()=>setShow(!show)} className="w-auto md:m-0 xs:mt-10 m-auto flex flex-col justify-center items-center ">
            <img
              src="./logo_sin_fondo.png"
              alt="logo"
              className="w-24 h-auto xs:hidden md:block"
            />
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

        <div className="border-t border-primary flex items-center p-4 justify-center gap-3 absolute bottom-0 left-0 w-full xs:hidden">
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
    </>
  );
}
