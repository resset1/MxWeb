import { useEffect, useState } from "react";
import PodiumForm from "./PodiumForm";
import type { PodiumFormData, RegisterPodiumModalProps } from "./types";

/**
 * Modal principal para Registrar Podio.
 * Reproduce el diseño móvil de la imagen con fondo blanco,
 * flecha de cierre hacia abajo (↓), barra superior y formulario estilizado.
 */
export default function RegisterPodiumModal({
  isOpen,
  raceTitle,
  onClose,
  onSubmitSuccess,
}: RegisterPodiumModalProps) {
  const [successData, setSuccessData] = useState<PodiumFormData | null>(null);

  const handleClose = () => {
    setSuccessData(null);
    onClose();
  };

  // Cierra con la tecla 'Escape' y bloquea el scroll del fondo cuando está abierto
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSuccessData(null);
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleFormSuccess = (data: PodiumFormData) => {
    setSuccessData(data);
    if (onSubmitSuccess) {
      onSubmitSuccess(data);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs transition-opacity duration-300 overscroll-none overflow-x-hidden touch-none"
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Contenedor del Modal con estilo smartphone / hoja emergente */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-[#131313] rounded-t-4xl sm:rounded-[36px] shadow-2xl flex flex-col max-h-[92dvh] sm:max-h-[88vh] overflow-x-hidden overflow-y-hidden animate-in fade-in slide-in-from-bottom-8 sm:slide-in-from-bottom-0 sm:zoom-in-95 duration-200 border border-neutral-800 touch-pan-y overscroll-contain"
      >
        {/* Barra superior con tirador sutil (handle bar) */}
        <div className="pt-3 pb-1 flex justify-center">
          <div className="w-12 h-1 bg-neutral-600 rounded-full" />
        </div>

        {/* Encabezado: flecha hacia abajo (↓) y título */}
        <div className="px-4 sm:px-6 pt-2 pb-3 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleClose}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-neutral-800 text-neutral-300 hover:text-white transition-colors cursor-pointer self-start -ml-1"
            aria-label="Cerrar modal"
          >
            <i className="fi fi-br-cross text-neutral-300 text-base"></i>
          </button>

          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-200 tracking-tight">
              Registrar podio
            </h2>
            {raceTitle && (
              <p className="text-xs text-neutral-400 font-medium mt-0.5 line-clamp-1">
                {raceTitle}
              </p>
            )}
          </div>
        </div>

        {/* Contenido scrolleable con el formulario (sin barra de scroll visible y estrictamente vertical) */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-4 sm:px-6 pb-8 pt-1 touch-pan-y overscroll-contain">
          {successData ? (
            // Mensaje de éxito al registrar
            <div className="flex flex-col items-center justify-center py-8 text-center gap-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-3xl shadow-sm">
                ✓
              </div>
              <h3 className="text-lg font-bold text-neutral-300">
                ¡Podio registrado con éxito!
              </h3>
              <p className="text-xs text-neutral-500 max-w-xs">
                Se guardó la información de{" "}
                <strong>{successData.pilotName}</strong> (
                {successData.bikeNumber}
                ).
              </p>
              <button
                type="button"
                onClick={handleClose}
                className="mt-4 px-6 py-3 bg-[#1D1E30] text-white text-sm font-semibold rounded-2xl hover:bg-[#2A2B42] transition-colors cursor-pointer"
              >
                Cerrar ventana
              </button>
            </div>
          ) : (
            // Formulario modular
            <PodiumForm raceTitle={raceTitle} onSuccess={handleFormSuccess} />
          )}
        </div>
      </div>
    </div>
  );
}
