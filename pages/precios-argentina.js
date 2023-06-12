export default function InfoPage() {
  return (
    <div className="border border-gray-600 shadow-md shadow-primary p-4 w-full h-auto flex flex-col font-audiowide">
      <h1 className="main-title text-center">Como calculamos los precios?</h1>
      <div className="flex justify-between gap-10 items-start mt-5 xs:flex-col">
        <p className="  w-2/3 xs:w-full mt-5 text-justify font-oswald text-2xl font-thin">
          Las plataformas digitales en Argentina nos muestran los precios sin
          los impuestos aplicados, lo que puede llevar a que nos llevemos una
          sorpresa a la hora de ver el resumen de nuestra tarjeta. Para evitar
          esto, calculamos los precios junto con sus impuestos aplicados, para
          asi evitar situaciones incomodas y gastos excesivos de manera
          accidental. A contiuacion, podras ver que impuestos se cobran en cada
          plataforma. <br /> <br />
          Otra cosa que hay que tener en cuenta en plataformas como Playstation
          Store o Microsoft Store es la conversion de dolar a peso, ya que
          dependiendo del valor de este el juego puede costar mas o menos. En
          este aspecto, hay que recordar que el valor del dolar que es tomado
          para la conversion es el del dolar oficial al dia del cierre de la
          tarjeta, por lo que no podemos saber 100% seguro cuanto costara el
          juego hasta que llegue el resumen. Sin embargo, podemos estar al dia
          con el precio del dolar, y asi hacer un calculo aproximado. A
          continuacion tendras la cotizacion del dolar al dia de hoy.
        </p>
        <div className="  w-1/3 xs:w-full h-auto ">
          <div className=" bg-gray-800  p-4 shadow-md shadow-gray-600 border border-cyan-900">
            <h2 className="text-center text-lg ">
              IMPUESTOS APLICADOS EN PLATAFORMAS DIGITALES
            </h2>
            <span className="flex items-center text-center justify-center text-5xl text-primary mt-5">
              75%*
            </span>
            <div className="flex justify-between items-center mt-5">
              <p className="text-gray-300 text-xs">
                Percepcion de ganancias y Bienes Personales <br /> RG AFIP N
                5232/2022
              </p>
              <span className="text-lg">45%</span>
            </div>
            <div className="flex justify-between items-center mt-5">
              <p className="text-gray-300 text-xs">
                Ley Impuesto Pais <br /> RG AFIP N 4659/2020
              </p>
              <span className="text-lg">30%</span>
            </div>
            <hr className="my-5" />
            <div className="flex justify-between items-center">
              <p className="text-gray-500 text-xs">
                *Percepcion Extra de Bienes Personales <br /> RG AFIP N
                5272/2022
              </p>
              <span className="text-gray-500 text-lg">25%</span>
            </div>
            <p className="text-center text-xs mt-5 text-gray-500">
              Aplica gastando 300 USD o mas en el mes.
            </p>
          </div>
          <div className=" bg-gray-800 mt-5 p-4 shadow-md shadow-gray-600 border border-cyan-900">
            <h2 className="text-center">DOLAR OFICIAL</h2>
            <div className="flex justify-center items-center gap-20 mt-5">
              <div className="flex flex-col">
                <span className="text-gray-500 text-xl">Compra</span>
                <span className="text-primary text-xl">$234.82</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500 text-xl">Venta</span>
                <span className="text-primary text-xl">$244.31</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-lg mt-5 p-5 ">
        {" "}
        Cabe aclarar que los precios calculados son <span className="text-xl text-primary">APROXIMADOS</span> y
        no necesariamente representan el valor que se cobre finalmente.
      </p>
    </div>
  );
}
