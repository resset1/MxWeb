import ImageBG from "../assets/images/MxRider.png"; // Importamos la imagen desde la carpeta de assets

export default function RiderBackground() {
  return (
    <div className="flex justify-center text-white selection:bg-orange-500 selection:text-black w-full overflow-hidden">
      <div className="relative w-full max-w-5xl overflow-hidden">
        {/* Texto */}
        <div className="pointer-events-none absolute inset-0 z-0 flex flex-col items-center justify-start select-none pt-2 sm:pt-0">
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black italic tracking-tighter uppercase leading-none text-transparent bg-clip-text bg-linear-to-b from-white/20 via-white/10 to-transparent">
            READY TO
          </span>
          <span className="text-7xl sm:text-8xl md:text-[9.5rem] lg:text-[11rem] font-black italic tracking-tighter uppercase leading-none text-transparent [-webkit-text-stroke:1.5px_rgba(249,115,22,0.7)] sm:[-webkit-text-stroke:2px_rgba(249,115,22,0.7)] drop-shadow-[0_0_40px_rgba(249,115,22,0.35)]">
            RACE
          </span>
        </div>

        {/* Imagen */}
        <div className="relative z-10 flex justify-center">
          <img
            src={ImageBG}
            alt="Rider"
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, black 65%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, black 65%, transparent 100%)",
            }}
            className="w-full h-72 sm:h-96 md:h-110 object-cover object-top drop-shadow-[0_20px_30px_rgba(0,0,0,0.8)]"
          />
        </div>
      </div>
    </div>
  );
}
