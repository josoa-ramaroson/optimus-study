export default async function fetcher(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error('Erreur lors de la récupération');
  return res.json();
}
