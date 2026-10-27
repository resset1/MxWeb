import { useState, useEffect, useRef } from "react";
import type { FormEvent } from "react";
import PhotoUploader from "./PhotoUploader";
import FormField from "./FormField";
import type { PodiumFormData } from "./types";
import {
  registerFullPodium,
  searchPilotsByDoc,
  type PilotSearchResult,
} from "../../services/podiumService";

interface PodiumFormProps {
  raceTitle: string;
  onSuccess: (data: PodiumFormData) => void;
}

/**
 * Formulario modular para registrar el podio.
 * Administra el estado interno de los campos y el botón de acción principal.
 */
export default function PodiumForm({ raceTitle, onSuccess }: PodiumFormProps) {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [pilotName, setPilotName] = useState("");
  const [documentNumber, setDocumentNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bikeNumber, setBikeNumber] = useState("");
  const [vinBike, setVinBike] = useState("");
  const [bikeBrand, setBikeBrand] = useState("");
  const [bikeModel, setBikeModel] = useState("");
  const [cilindrada, setCilindrada] = useState("");
  const [bikeYear, setBikeYear] = useState("");
  const [sport, setSport] = useState("");
  const [category, setCategory] = useState("");
  const [event, setEvent] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [position, setPosition] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Estados para búsqueda por cédula
  const [suggestions, setSuggestions] = useState<PilotSearchResult[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const isSelectingRef = useRef(false);
  const cedulaContainerRef = useRef<HTMLDivElement>(null);

  // Cierra el menú si se hace clic fuera del campo de cédula
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        cedulaContainerRef.current &&
        !cedulaContainerRef.current.contains(e.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Busca pilotos coincidentes cuando el usuario tipea la cédula
  useEffect(() => {
    if (isSelectingRef.current) {
      isSelectingRef.current = false;
      return;
    }

    const trimmed = documentNumber.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      setIsSearching(true);
      try {
        const results = await searchPilotsByDoc(trimmed);
        setSuggestions(results);
        setShowSuggestions(results.length > 0);
      } catch (err) {
        console.error("Error buscando cédula:", err);
        setSuggestions([]);
      } finally {
        setIsSearching(false);
      }
    }, 250);

    return () => clearTimeout(timer);
  }, [documentNumber]);

  // Al presionar un piloto encontrado, rellena sus datos y los de su vehículo
  const handleSelectPilot = (pilot: PilotSearchResult) => {
    isSelectingRef.current = true;
    setShowSuggestions(false);
    setSuggestions([]);

    // Datos del piloto
    setDocumentNumber(pilot.NumDoc || "");
    setPilotName(pilot.NomApe || "");
    setPhone(pilot.NumTelf || "");
    setEmail(pilot.Email || "");
    setBikeNumber(pilot.NumPiloto || "");

    // Datos del vehículo (si tiene)
    const veh =
      pilot.tbVehiculos && pilot.tbVehiculos.length > 0
        ? pilot.tbVehiculos[0]
        : null;

    if (veh) {
      setBikeBrand(veh.MarcaVeh || "");
      setBikeModel(veh.ModeVeh || "");
      setCilindrada(veh.Cilindrada || "");
      setBikeYear(veh.YearVeh || "");
      setVinBike(veh.VinVeh || "");
    }

    // Nota: position, eventDate, category, sport, event y photoUrl se mantienen intactos
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const formData: PodiumFormData = {
      raceTitle,
      pilotName,
      documentNumber,
      email,
      phone,
      bikeNumber,
      vinBike,
      bikeBrand,
      bikeModel,
      cilindrada,
      bikeYear,
      sport,
      category,
      event,
      eventDate,
      position,
      photoUrl,
    };

    try {
      await registerFullPodium(formData);
      onSuccess(formData);
    } catch (err: any) {
      setErrorMessage(err.message || "Error al registrar el podio.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* 1. Recuadro para subir la foto (estilo mockup) */}
      <PhotoUploader photoUrl={photoUrl} onPhotoSelected={setPhotoUrl} />

      {/* 2. Campo: Nombre del Evento */}
      <FormField
        label="Evento"
        value={event}
        onChange={setEvent}
        placeholder="Ej. 2da Válida Nacional de Enduro"
        required
      />

      {/* 3. Campo: Cédula con búsqueda y autocompletado interactivo */}
      <div
        className="relative flex flex-col gap-1.5 w-full"
        ref={cedulaContainerRef}
      >
        <label className="text-xs sm:text-sm font-semibold text-neutral-200">
          Cedula <span className="text-red-500 font-bold">*</span>
        </label>
        <div className="relative w-full">
          <input
            type="text"
            value={documentNumber}
            onChange={(e) => {
              isSelectingRef.current = false;
              setDocumentNumber(e.target.value);
            }}
            onFocus={() => {
              if (suggestions.length > 0) setShowSuggestions(true);
            }}
            placeholder="Ej. 20567981"
            required
            className="w-full bg-[#131313] text-neutral-200 placeholder:italic placeholder:text-neutral-400 text-sm px-4 py-3 sm:py-3.5 rounded-2xl border-3 border-neutral-500 focus:border-orange-500 focus:outline-none transition-all"
          />
          {isSearching && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center pointer-events-none">
              <span className="w-4 h-4 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin" />
            </div>
          )}
        </div>

        {/* Dropdown flotante con pilotos encontrados */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 mt-1.5 z-50 bg-[#181818] border border-neutral-700/80 rounded-2xl shadow-2xl overflow-hidden divide-y divide-neutral-800/80 backdrop-blur-md animate-in fade-in zoom-in-95 duration-150">
            <div className="max-h-56 overflow-y-auto">
              {suggestions.map((pilot) => {
                const veh =
                  pilot.tbVehiculos && pilot.tbVehiculos.length > 0
                    ? pilot.tbVehiculos[0]
                    : null;

                return (
                  <button
                    key={pilot.idPiloto}
                    type="button"
                    onClick={() => handleSelectPilot(pilot)}
                    className="w-full px-4 py-3 text-left hover:bg-orange-500/10 focus:bg-orange-500/15 transition-colors flex items-center justify-between gap-3 cursor-pointer group"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-sm font-semibold text-neutral-100 group-hover:text-orange-400 transition-colors truncate">
                        {pilot.NomApe}
                      </span>
                      <span className="text-xs text-neutral-400 truncate">
                        {veh
                          ? `${veh.MarcaVeh} ${veh.ModeVeh} ${veh.YearVeh ? `(${veh.YearVeh})` : ""}`
                          : pilot.Email || "Sin vehículo asociado"}
                      </span>
                    </div>

                    <div className="flex flex-col items-end shrink-0">
                      <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-lg border border-orange-500/20">
                        CI: {pilot.NumDoc}
                      </span>
                      {pilot.NumPiloto && (
                        <span className="text-[11px] text-neutral-400 mt-0.5">
                          #{pilot.NumPiloto}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <FormField
        label="Nombre del Piloto"
        value={pilotName}
        onChange={setPilotName}
        placeholder="Ej. Carlos"
        required
      />

      <FormField
        label="Telefono"
        value={phone}
        onChange={setPhone}
        placeholder="+58 4123456789"
        required
      />

      <FormField
        label="Email"
        value={email}
        onChange={setEmail}
        placeholder="Ej. CarlosMendoza@gmail.com"
        required
      />

      <FormField
        label="Número de Moto"
        value={bikeNumber}
        onChange={setBikeNumber}
        placeholder="Ej. #77"
        required
      />

      <FormField
        label="Marca de la Moto"
        value={bikeBrand}
        onChange={setBikeBrand}
        placeholder="Ej. Husqvarna"
        required
      />

      <FormField
        label="Modelo de la Moto"
        value={bikeModel}
        onChange={setBikeModel}
        placeholder="Ej. TE 300i"
        required
      />

      <FormField
        label="Cilindrada"
        value={cilindrada}
        onChange={setCilindrada}
        placeholder="Ej. 300cc"
        required
      />

      <FormField
        label="Año de la Moto"
        value={bikeYear}
        onChange={setBikeYear}
        placeholder="Ej. 2024"
        required
      />

      <FormField
        label="VIN de la Moto"
        value={vinBike}
        onChange={setVinBike}
        placeholder="Ej. AF123456789"
        required
      />

      <FormField
        label="Deporte"
        value={sport}
        onChange={setSport}
        placeholder="Ej. Enduro"
        required
      />

      <FormField
        label="Categoria"
        value={category}
        onChange={setCategory}
        placeholder="Ej. PRO"
        required
      />

      <FormField
        label="Posicion Obtenida"
        value={position}
        onChange={setPosition}
        placeholder="Ej. 1er lugar"
        required
      />

      <FormField
        label="Fecha del Evento"
        type="date"
        value={eventDate}
        onChange={setEventDate}
        required
      />

      {/* Mensaje de error si falla la llamada a Supabase */}
      {errorMessage && (
        <div className="p-3 text-sm text-red-400 bg-red-950/40 border border-red-800/50 rounded-2xl text-center">
          {errorMessage}
        </div>
      )}

      {/* 6. Botón de acción principal con estilo oscuro idéntico al mockup */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 py-4 px-6 bg-orange-500 hover:bg-orange-600 active:scale-[0.98] text-white font-medium text-sm sm:text-base rounded-2xl transition-all shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isSubmitting ? (
          <>
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            <span>Guardando...</span>
          </>
        ) : (
          <span>Registrar podio</span>
        )}
      </button>
    </form>
  );
}
