/**
 * Generate SHA-256
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function generateHashFromFile(file: File): Promise<string> {
  const buffer = await file.arrayBuffer();
  const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((unit) => unit.toString(16).padStart(2, '0')).join('');
}
