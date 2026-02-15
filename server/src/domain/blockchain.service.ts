import {
  ConflictError,
  InternalServerError,
  NotFoundError,
  StatusError,
} from "../routes/exceptions/statusError";
import type { BlockChainState } from "../routes/payloads/blockchainState";
import type { EnrollmentResult } from "../routes/payloads/enrollmentResult";
import type { FileRecord } from "../routes/payloads/fileRecord";
import type { VerificationResult } from "../routes/payloads/verificationResult";
import { Left, Right, type Either } from "../utils/either";
import { Block } from "./block";
import { BlockChain } from "./blockchain";

export class BlockChainService {
  private blockChain: BlockChain<FileRecord>;

  constructor(blockChain: BlockChain<FileRecord>) {
    this.blockChain = blockChain;
  }

  getBlockChainState(): Either<StatusError, BlockChainState<FileRecord>> {
    try {
      const blocks = this.blockChain.blocks.map((block, index) => ({
        index,
        data: block.data,
        hash: block.hash,
        prevHash: block.prevHash,
        timestamp: block.timestamp,
      }));

      return Right.create({
        blocks,
        isValid: this.blockChain.isValid(),
        totalBlocks: this.blockChain.getBlockCount(),
      });
    } catch (error) {
      return Left.create(new InternalServerError((error as Error).message));
    }
  }

  #findBlock(fileHash: string): {
    index: number;
    block: Block<FileRecord> | undefined;
  } {
    for (let i = 0; i < this.blockChain.blocks.length; i++) {
      const block = this.blockChain.blocks[i];
      if (!block) {
        throw new Error(`Corrupted BlockChain (Index: ${i})`);
      }

      if (block.data.fileHash === fileHash) {
        return { index: i, block };
      }
    }
    return { index: -1, block: undefined };
  }

  enrollFile(record: FileRecord): Either<StatusError, EnrollmentResult> {
    try {
      const { block: existingBlock } = this.#findBlock(record.fileHash);

      if (existingBlock) {
        return Left.create(new ConflictError("Block Already Exists"));
      }

      const newBlock = new Block<FileRecord>(record, new Date().getTime());
      this.blockChain.addNewBlock(newBlock);

      return Right.create({
        blockHash: newBlock.hash,
        blockIndex: this.blockChain.getBlockCount() - 1,
        timestamp: newBlock.timestamp,
        totalBlocks: this.blockChain.getBlockCount(),
      });
    } catch (error) {
      return Left.create(new InternalServerError((error as Error).message));
    }
  }

  verifyFile(fileHash: string): Either<StatusError, VerificationResult> {
    try {
      const isChainValid = this.blockChain.isValid();
      const { block, index: blockIndex } = this.#findBlock(fileHash);

      if (!block) {
        return Left.create(new NotFoundError("Block Not Found"));
      }

      return Right.create({
        blockHash: block.hash,
        blockIndex,
        fileName: block.data.fileName,
        isChainValid,
        timestamp: block.timestamp,
      });
    } catch (error) {
      return Left.create(new InternalServerError((error as Error).message));
    }
  }
}
