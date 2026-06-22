import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://vfemmxzbgbkbrlszudmd.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZmZW1teHpiZ2JrYnJsc3p1ZG1kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIxMDA0MzQsImV4cCI6MjA5NzY3NjQzNH0.iiJjQfs-vV_wamfn-Nnm_cugUcQni-a6YynsxE8N29Y";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
