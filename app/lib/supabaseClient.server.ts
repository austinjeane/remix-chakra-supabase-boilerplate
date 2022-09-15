import { createClient } from '@supabase/supabase-js'

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_KEY;

if(!url) {
  throw new Error('SUPABASE_URL is not set');
}

if(!key) {
  throw new Error('SUPABASE_KEY is not set');
}

// Create a single supabase client for interacting with your database 
export const supabase = createClient(url, key);