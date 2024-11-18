import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://bqsznqvlvzxxwhizoqbp.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJxc3pucXZsdnp4eHdoaXpvcWJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE5MTYzODEsImV4cCI6MjA0NzQ5MjM4MX0.OMG5QDdQbUQpVgWtfb2vER1SsiubKLbWtLy3Rgw7qHU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
