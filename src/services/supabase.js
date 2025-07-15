import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://yfurklaqvsxkxdthgujz.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlmdXJrbGFxdnN4a3hkdGhndWp6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI1ODU0NzAsImV4cCI6MjA2ODE2MTQ3MH0.JOKYyimQM9Fky_a6qP9SmvBdrpAZ_F77DOxuRdSna-c";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
