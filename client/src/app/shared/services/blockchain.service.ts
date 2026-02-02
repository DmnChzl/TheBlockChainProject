import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Block, BlockChainState } from '../models/blockchain.model';
import { FileRecord } from '../models/file-record.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BlockChainService {
  private apiService = inject(ApiService);

  state = signal<BlockChainState<FileRecord>>({
    blocks: [],
    isValid: true,
    totalBlocks: 0,
  });

  load() {
    this.apiService.getBlockChain().subscribe({
      next: (val) => this.state.set(val),
      error: (err) => {
        // eslint-disable-next-line no-console
        console.warn((err as Error).message);
      },
    });
  }

  findBlock(index: number): Block<FileRecord> | undefined {
    return this.state().blocks[index];
  }

  findBlockByHash(hash: string): Block<FileRecord> | undefined {
    return this.state().blocks.find((block) => block.hash === hash);
  }

  enroll(record: FileRecord) {
    return this.apiService.enrollFile(record).pipe(tap(() => this.load()));
  }

  verify(record: FileRecord) {
    return this.apiService.verifyFile(record);
  }
}
