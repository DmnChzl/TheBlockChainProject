export interface VerificationResult {
  blockHash: string;
  blockIndex: number;
  fileName: string;
  isChainValid: boolean;
  timestamp: number;
}
