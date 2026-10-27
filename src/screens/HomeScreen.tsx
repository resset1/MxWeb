import { useState } from "react";
import RiderBackground from "../components/RiderBackground";
import RaceCard from "../components/RaceCard";
import { RegisterPodiumModal } from "../components/podium-modal";
import logoHusq from "../assets/images/HusqvarnaLogo.png";
import logoGasGas from "../assets/images/GasGasLogo.png";
import logoRTR from "../assets/images/rtr.png";

export default function HomeScreen() {
  // Estados para controlar el modal de Registro de Podio
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRaceTitle, setSelectedRaceTitle] = useState("");

  // Abre el modal asociando el título de la carrera seleccionada
  const handleOpenRegisterModal = (raceTitle: string) => {
    setSelectedRaceTitle(raceTitle);
    setIsModalOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 bg-[#131316] text-white selection:bg-orange-500 selection:text-black w-full overflow-x-hidden">
      {/* Cabecera de la pagina */}
      <RiderBackground />

      <main className="w-full max-w-5xl mx-auto px-4 sm:px-6 relative z-20 -mt-6 sm:-mt-10 flex flex-col items-center gap-8 sm:gap-10">
        {/* Texto explicativo entre RiderBackground y las cards */}
        <section className="max-w-2xl mx-auto flex flex-col items-center gap-3 text-center px-2">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black italic tracking-tight uppercase leading-tight text-center">
            Registra tus resultados y{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-orange-400 to-amber-500">
              demuestra tu nivel!!!
            </span>
          </h2>
          <p className="text-neutral-400 text-sm sm:text-base leading-relaxed max-w-xl text-center">
            Este sitio está orientado a que los pilotos registren sus resultados
            y datos oficiales en cada válida, permitiendo llevar un seguimiento
            continuo de su rendimiento para futuras premiaciones,
            clasificaciones y consideraciones deportivas.
          </p>
        </section>

        <div className="w-full max-w-md sm:max-w-lg mx-auto">
          <RaceCard
            onRegisterPodium={() =>
              handleOpenRegisterModal("Registra tus resultados obtenidos")
            }
          />
        </div>
      </main>

      <RegisterPodiumModal
        isOpen={isModalOpen}
        raceTitle={selectedRaceTitle}
        onClose={handleCloseRegisterModal}
      />

      <footer className="flex flex-col items-center justify-center pt-8 pb-10 px-4 sm:px-6 gap-8 w-full max-w-5xl mx-auto">
        <div className="flex flex-col items-center gap-4 w-full">
          <div className="grid grid-cols-2 gap-3 sm:gap-6 place-items-center w-full max-w-xs sm:max-w-md">
            {/* Logo 1 - GasGas */}
            <div className="bg-white/95 hover:bg-white p-3 sm:p-4 rounded-2xl shadow-md hover:shadow-xl border border-white/20 flex items-center justify-center w-full h-18 sm:h-20 transition-all duration-300 hover:scale-105">
              <img
                src={logoGasGas}
                alt="Logo GasGas"
                className="max-h-12 sm:max-h-14 max-w-full object-contain"
              />
            </div>

            {/* Logo 2 - Husqvarna */}
            <div className="bg-white/95 hover:bg-white p-3 sm:p-4 rounded-2xl shadow-md hover:shadow-xl border border-white/20 flex items-center justify-center w-full h-18 sm:h-20 transition-all duration-300 hover:scale-105">
              <img
                src={logoHusq}
                alt="Logo Husqvarna"
                className="max-h-12 sm:max-h-14 max-w-full object-contain"
              />
            </div>

            {/* Logo 3 - RTR (Centrado abajo entre los dos) */}
            <div className="col-span-2 bg-white/95 hover:bg-white p-3 sm:p-4 rounded-2xl shadow-md hover:shadow-xl border border-white/20 flex items-center justify-center w-36 sm:w-44 h-18 sm:h-20 transition-all duration-300 hover:scale-105">
              <img
                src={logoRTR}
                alt="Logo RTR"
                className="max-h-12 sm:max-h-14 max-w-full object-contain"
              />
            </div>
          </div>
        </div>

        <span className="text-xs sm:text-sm font-medium text-neutral-500 font-primary text-center">
          Todos los derechos reservados © 2026
        </span>
      </footer>
    </div>
  );
}
