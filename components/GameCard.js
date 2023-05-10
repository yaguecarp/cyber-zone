export default function GameCard({ imagen, titulo, plataformas }) {
  return (
    <>
      <div className="card">
        <img src={imagen} alt="" />
        <div className="p-2 flex w-full  justify-start items-center ">
          {/* {plataformas} */}
          <h2 className="text-lg  ">{titulo}</h2>
        </div>
      </div>
    </>
  );
}
