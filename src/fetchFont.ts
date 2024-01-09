/**
 * Fetches a font from a URL.
 *
 * @param url The URL of the font.
 *
 * @returns The font data.
 */
export async function fetchFont(url: URL | string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch font: ${response.statusText}`);
  }
  return response.arrayBuffer();
}
