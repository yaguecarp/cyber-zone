export default function GameCard({ imagen, titulo, plataformas }) {
  return (
    <>
      <div className="card">
        <img src={imagen} alt="" className="w-full h-full object-cover" />
        <div className="p-2 flex w-full  justify-start items-center ">
          <h2 className="text-lg  ">{titulo}</h2>
        </div>
      </div>
    </>
  );
}
