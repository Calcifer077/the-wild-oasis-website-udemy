import { createClient } from "@supabase/supabase-js";

// console.log(process.env.SUPBASE_URL);

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY,
);
