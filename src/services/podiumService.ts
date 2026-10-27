import { supabase } from "./supabase";
import type { PodiumFormData } from "../components/podium-modal/types";

export interface RegisterPodiumResponse {
  status: string;
  idPiloto: string;
  idVeh: string;
  idEven: string;
}

export interface VehicleData {
  idVeh: string;
  MarcaVeh: string;
  ModeVeh: string;
  Cilindrada: string;
  VinVeh: string;
  YearVeh: string;
}

export interface PilotSearchResult {
  idPiloto: string;
  NomApe: string;
  NumDoc: string;
  NumTelf: string;
  Email: string;
  NumPiloto: string;
  tbVehiculos?: VehicleData[];
}

/**
 * Llama a la función almacenada en Supabase 'registrar_formulario_completo'
 * que inserta y relaciona en tbPilotos, tbVehiculos y tbEventos en una sola transacción.
 */
export async function registerFullPodium(data: PodiumFormData): Promise<RegisterPodiumResponse> {
  const formattedDate = data.eventDate || new Date().toISOString().split("T")[0];

  const { data: result, error } = await supabase.rpc("registrar_formulario_completo", {
    // 1. Datos para tbPilotos
    p_nom_ape: data.pilotName,
    p_num_doc: data.documentNumber,
    p_num_telf: data.phone,
    p_email: data.email,
    p_num_piloto: data.bikeNumber,

    // 2. Datos para tbVehiculos
    p_marca_veh: data.bikeBrand,
    p_mode_veh: data.bikeModel,
    p_cilindrada: data.cilindrada || "N/A",
    p_vin_veh: data.vinBike,
    p_year_veh: data.bikeYear,

    // 3. Datos para tbEventos
    p_nom_even: data.event || data.raceTitle,
    p_tip_depor: data.sport,
    p_cat_depor: data.category,
    p_pos_podio: data.position,
    p_fotos_podio: data.photoUrl || "",
    p_fec_even: formattedDate,
  });

  if (error) {
    console.error("Error al registrar en Supabase:", error);
    throw new Error(error.message || "Error al registrar el podio en la base de datos.");
  }

  return result as RegisterPodiumResponse;
}

/**
 * Busca pilotos por número de cédula (NumDoc) y obtiene sus datos y vehículos asociados.
 */
export async function searchPilotsByDoc(docQuery: string): Promise<PilotSearchResult[]> {
  const cleanDoc = docQuery.trim();
  if (cleanDoc.length < 2) return [];

  const { data, error } = await supabase
    .from("tbPilotos")
    .select(`
      idPiloto,
      NomApe,
      NumDoc,
      NumTelf,
      Email,
      NumPiloto,
      tbVehiculos (
        idVeh,
        MarcaVeh,
        ModeVeh,
        Cilindrada,
        VinVeh,
        YearVeh
      )
    `)
    .ilike("NumDoc", `%${cleanDoc}%`)
    .limit(5);

  if (error) {
    console.error("Error al buscar pilotos por documento:", error);
    return [];
  }

  return (data as unknown as PilotSearchResult[]) || [];
}