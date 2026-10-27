import Poster from "../assets/images/MxRiderFront.png";

interface RaceCardProps {
  onRegisterPodium?: () => void;
}

export default function RaceCard({ onRegisterPodium }: RaceCardProps) {
  return (
    <div className="flex flex-col bg-linear-to-b from-orange-500 via-[#1f1f24] to-[#25252b] border-2 sm:border-3 border-orange-500 shadow-2xl hover:shadow-[0_20px_35px_-10px_rgba(0,0,0,0.6)] rounded-3xl overflow-hidden group transition-all duration-300 w-full">
      {/* Contenedor de la imagen */}
      <div className="relative w-full flex justify-center overflow-hidden bg-neutral-900/40">
        <img
          src={Poster}
          alt="Piloto de MX"
          style={{
            WebkitMaskImage:
              "linear-gradient(to bottom, black 55%, transparent 100%)",
            maskImage:
              "linear-gradient(to bottom, black 55%, transparent 100%)",
          }}
          className="w-full h-52 sm:h-64 object-cover object-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.7)] group-hover:scale-105 transition-transform duration-500 ease-out"
        />
      </div>

      {/* Contenido inferior */}
      <div className="flex flex-col gap-6 sm:gap-8 py-5 px-4 sm:px-6 flex-1 justify-between">
        <div className="flex flex-col gap-1.5 sm:gap-2">
          <h2 className="text-white font-bold text-xl sm:text-2xl text-center tracking-tight leading-snug drop-shadow-sm">
            ¿Hiciste podio?
          </h2>

          <p className="text-neutral-200 text-xs sm:text-sm text-center tracking-tight leading-relaxed drop-shadow-sm">
            Completa el formulario con los datos de tu carrera
          </p>
        </div>
        {/* Botón para abrir el modal de registro */}
        <button
          type="button"
          onClick={onRegisterPodium}
          className="mx-auto flex items-center justify-center gap-2 bg-orange-500 text-white font-primary font-extrabold uppercase tracking-wider text-xs sm:text-sm py-3 px-7 rounded-full hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer shadow-lg hover:bg-orange-600"
        >
          Registrar Ahora
        </button>
      </div>
    </div>
  );
}
