/**
 * Generate SHA-256
 *
 * @param {string} message
 * @returns {string}
 */
export const generateHash = (message: string): string => {
  if (typeof Bun !== "undefined") {
    const hasher = new Bun.CryptoHasher("sha256");
    hasher.update(message);
    return hasher.digest("hex");
  }

  const crypto = require("crypto");
  return crypto.createHash("sha256").update(message).digest("hex");
};
