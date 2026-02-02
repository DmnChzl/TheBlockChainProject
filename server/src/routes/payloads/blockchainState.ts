interface BlockState<T = Record<string, unknown>> {
  index: number;
  data: T;
  hash: string;
  prevHash: string;
  timestamp: number;
}

export interface BlockChainState<T = Record<string, unknown>> {
  blocks: BlockState<T>[];
  isValid: boolean;
  totalBlocks: number;
}
