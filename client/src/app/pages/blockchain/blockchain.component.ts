import { Component, computed, inject, signal } from '@angular/core';
import { ClipBoardIconComponent, DiamondIconComponent } from '@shared/components/icons';
import { NotificationComponent } from '@shared/components/notification';
import { NotificationService } from '@shared/services/notification.service';
import { ButtonComponent } from '@shared/components/button';
import { ModalComponent } from '@shared/components/modal/modal.component';
import { MainLayoutComponent } from '@shared/layouts/main';
import { Block } from '@shared/models/blockchain.model';
import { FileRecord } from '@shared/models/file-record.model';
import { BlockChainService } from '@shared/services/blockchain.service';
import { ModalService } from '@shared/services/modal.service';
import * as DateUtils from '@shared/utils/dateUtils';
import { ListItem } from './components/list-item/list-item.model';
import { ListViewComponent } from './components/list-view';

const fromBlockToItem = <T>(block: Block<T>): ListItem => {
  const title = `${block.hash.substring(0, 16)} ... ${block.hash.substring(block.hash.length - 16)}`;
  const subTitle = DateUtils.formatDateTime(block.timestamp);

  return {
    index: block.index,
    title,
    subTitle,
  };
};

type BlockWithDateTime<T> = Block<T> & {
  dateTime: string;
};

@Component({
  selector: 'app-blockchain-page',
  standalone: true,
  imports: [
    MainLayoutComponent,
    ButtonComponent,
    ClipBoardIconComponent,
    ListViewComponent,
    ModalComponent,
    NotificationComponent,
    DiamondIconComponent,
  ],
  templateUrl: './blockchain.component.html',
})
export class BlockChainPageComponent {
  private blockChainService = inject(BlockChainService);
  private modalService = inject(ModalService);
  private notificationService = inject(NotificationService);

  readonly blocks = computed(() => this.blockChainService.state().blocks);
  readonly selectedBlock = signal<BlockWithDateTime<FileRecord> | null>(null);
  readonly allItems = computed(() => this.blocks().map(fromBlockToItem));

  constructor() {
    this.blockChainService.load();
  }

  handleClickItem(blockIndex: number) {
    const block = this.blockChainService.findBlock(blockIndex);
    if (!block) return;
    const dateTime = DateUtils.formatDateTime(block.timestamp);

    this.selectedBlock.set({ ...block, dateTime });
    this.modalService.open({ icon: 'cube', title: `Block #${blockIndex}` });
  }

  closeModal() {
    this.modalService.close();
    this.selectedBlock.set(null);
  }

  copyText(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.notificationService.info('Copied!');
    });
  }
}
