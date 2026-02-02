import { Block } from "./block";

export class BlockChain<T = Record<string, unknown>> {
  blocks: Block<T>[];

  constructor() {
    this.blocks = [this.getGenesisBlock()];
  }

  getGenesisBlock(): Block<T> {
    return new Block<T>({} as T);
  }

  getBlockCount(): number {
    return this.blocks.length;
  }

  /**
   * @method getLastBlock
   * @template T
   * @throws {Error} Empty BlockChain
   * @returns {Block<T>}
   */
  getLastBlock(): Block<T> {
    const lastBlock = this.blocks[this.getBlockCount() - 1];
    if (!lastBlock) {
      throw new Error("Empty BlockChain: Genesis Block Not Found!");
    }
    return lastBlock;
  }

  addNewBlock(newBlock: Block<T>) {
    newBlock.prevHash = this.getLastBlock().hash;
    newBlock.hash = newBlock.getHash();

    // This Is Immutability
    const frozenBlock = Object.freeze(newBlock);
    this.blocks.push(frozenBlock);
  }

  /**
   * @method isValid
   * @throws {Error} Corrupted BlockChain
   * @returns {boolean}
   */
  isValid(): boolean {
    for (let i = 1; i < this.getBlockCount(); i++) {
      const currentBlock = this.blocks[i];
      const prevBlock = this.blocks[i - 1];

      if (!currentBlock || !prevBlock) {
        throw new Error(`Corrupted BlockChain (Index: ${i})`);
      }

      if (
        currentBlock.hash !== currentBlock.getHash() ||
        prevBlock.hash !== currentBlock.prevHash
      ) {
        return false;
      }
    }
    return true;
  }
}
