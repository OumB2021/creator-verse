import dotenv from "dotenv";
dotenv.config(); // Load .env once here
import { createClient } from "@supabase/supabase-js";

const URL = process.env.DATABASE_URL;
const API_KEY = process.env.DATABASE_KEY;
export const supabase = createClient(URL, API_KEY);
