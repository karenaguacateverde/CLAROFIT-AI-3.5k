// Estos dos valores NO son secretos — están diseñados por Supabase para vivir
// en el navegador (se ven en cualquier inspector de red). Se dejan fijos aquí
// (no leídos de una variable de entorno) porque el campo de Vercel se corrompió
// varias veces al pegarlos (guardaba puntos en vez del texto real); así el
// login nunca depende de ese campo.
export const SUPABASE_URL = 'https://dbpwteazeuoscmvhiiix.supabase.co';

export const SUPABASE_PUBLISHABLE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRicHd0ZWF6ZXVvc2NtdmhpaWl4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODc2Mzg2NzAsImV4cCI6MjEwMzIxNDY3MH0.vrfV0ddBHBBHh38qVvVvMCOqH1JhDUvzlSNYL-yCR98';
