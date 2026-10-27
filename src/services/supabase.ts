import { createClient } from "@supabase/supabase-js";

// Importacion de variables locales
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// Metodo para definir la conexion a supabase
if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL or Key is not defined");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
