import { useRef } from "react";
import type { ChangeEvent, DragEvent } from "react";
import type { PhotoUploaderProps } from "./types";

/**
 * Componente para subir y previsualizar la foto del podio.
 * Sigue el estilo de tarjeta gris suave con el icono "+" centrado.
 */
export default function PhotoUploader({
  photoUrl,
  onPhotoSelected,
}: PhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Maneja la selección del archivo desde el explorador del dispositivo
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      onPhotoSelected(url);
    }
  };

  // Permite arrastrar y soltar la imagen sobre el recuadro
  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      onPhotoSelected(url);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />

      {photoUrl ? (
        // Estado con foto cargada: previsualización y botón para eliminar
        <div className="relative w-full h-56 sm:h-64 rounded-3xl overflow-hidden group border border-neutral-200 shadow-inner bg-neutral-100">
          <img
            src={photoUrl}
            alt="Foto del podio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white text-neutral-800 text-xs font-semibold py-2 px-4 rounded-full shadow hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              Cambiar
            </button>
            <button
              type="button"
              onClick={() => onPhotoSelected(null)}
              className="bg-red-500 text-white text-xs font-semibold py-2 px-4 rounded-full shadow hover:bg-red-600 transition-colors cursor-pointer"
            >
              Eliminar
            </button>
          </div>
        </div>
      ) : (
        // Estado vacío: estilo idéntico al diseño con "Añadir foto" y "+"
        <div
          onClick={() => fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="w-full h-56 sm:h-64 bg-[#131313] hover:bg-[#1a1a1a] rounded-3xl flex flex-col items-center justify-center cursor-pointer transition-colors border-3 border-neutral-500"
          role="button"
          tabIndex={0}
          aria-label="Añadir foto"
        >
          <span className="text-neutral-500 font-medium text-sm mb-1 tracking-tight">
            Añadir foto
          </span>
          <span className="text-neutral-800 text-4xl font-light leading-none">
            +
          </span>
        </div>
      )}
    </div>
  );
}
