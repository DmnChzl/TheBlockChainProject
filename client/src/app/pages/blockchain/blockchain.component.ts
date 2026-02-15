import { Component, computed, inject, model, signal } from '@angular/core';
import { DiamondIconComponent } from '@shared/components/icons';
import { NotificationComponent } from '@shared/components/notification';
import { MainLayoutComponent } from '@shared/layouts/main';
import { Block } from '@shared/models/blockchain.model';
import { FileRecord } from '@shared/models/file-record.model';
import { BlockChainService } from '@shared/services/blockchain.service';
import { ModalService } from '@shared/services/modal.service';
import { NotificationService } from '@shared/services/notification.service';
import * as DateUtils from '@shared/utils/dateUtils';
import { ListItem } from './components/list-item/list-item.model';
import { ListViewComponent } from './components/list-view';
import { ModalBlockComponent } from './components/modal-block/modal-block.component';
import { SearchFilterComponent } from './components/search-filter';

const fromBlockToItem = <T>(block: Block<T>): ListItem => {
  const title = `${block.hash.substring(0, 16)} ... ${block.hash.substring(block.hash.length - 16)}`;

  return {
    index: block.index,
    title,
    subTitle: DateUtils.formatDateTime(block.timestamp),
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
    ListViewComponent,
    NotificationComponent,
    DiamondIconComponent,
    SearchFilterComponent,
    ModalBlockComponent,
  ],
  templateUrl: './blockchain.component.html',
})
export class BlockChainPageComponent {
  private blockChainService = inject(BlockChainService);
  private modalService = inject(ModalService);
  private notificationService = inject(NotificationService);

  searchFilter = model('');
  selectedBlock = signal<BlockWithDateTime<FileRecord> | null>(null);

  readonly blocks = computed(() => this.blockChainService.state().blocks);
  readonly allItems = computed(() => {
    return this.blocks()
      .filter(({ hash, prevHash }) => hash.includes(this.searchFilter()) || prevHash.includes(this.searchFilter()))
      .map(fromBlockToItem);
  });

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

  resetSelectedBlock() {
    this.selectedBlock.set(null);
  }

  notifyCopy() {
    this.notificationService.info('Copied!');
  }
}
