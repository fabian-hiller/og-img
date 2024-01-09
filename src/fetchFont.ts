/**
 * Fetches a font from a URL.
 *
 * @param url The URL of the font.
 *
 * @returns The font data.
 */
export async function fetchFont(url: URL | string) {
  const resposne = await fetch(url);
  if (!resposne.ok) {
    throw new Error(`Failed to fetch font: ${resposne.statusText}`);
  }
  return resposne.arrayBuffer();
}
