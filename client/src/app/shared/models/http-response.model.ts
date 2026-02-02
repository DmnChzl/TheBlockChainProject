export type HttpResponseWithStatus<T> = ResolvedResponse<T> | RejectedResponse;

export interface ResolvedResponse<T> {
  status: 'fulfilled';
  data: T;
}

export interface RejectedResponse {
  status: 'rejected';
  message: string;
}

export interface EnrollmentResult {
  blockHash: string;
  blockIndex: number;
  timestamp: number;
  totalBlocks: number;
}

export interface VerificationResult {
  blockHash: string;
  blockIndex: number;
  fileName: string;
  isChainValid: boolean;
  timestamp: number;
}
