import { generateHash } from "../utils/cryptoUtils";

export class Block<T = Record<string, unknown>> {
  data: T;
  hash: string;
  prevHash: string;
  timestamp: number;

  constructor(data: T, timestamp = Date.now()) {
    this.data = data;
    this.hash = this.getHash();
    this.prevHash = "";
    this.timestamp = timestamp;
  }

  getHash(): string {
    return generateHash(
      this.timestamp + JSON.stringify(this.data) + this.prevHash,
    );
  }

  toString(): string {
    return JSON.stringify({
      data: this.data,
      hash: this.hash,
      prevHash: this.prevHash,
      timestamp: this.timestamp,
    });
  }
}
