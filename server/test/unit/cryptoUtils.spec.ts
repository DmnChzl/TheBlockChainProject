import { describe, expect, it } from "vitest";
import { generateHash } from "../../src/utils/cryptoUtils";

describe("cryptoUtils", () => {
  it("should generate hash", () => {
    const hash = generateHash("message");
    expect(hash).toHaveLength(64);
  });
});
