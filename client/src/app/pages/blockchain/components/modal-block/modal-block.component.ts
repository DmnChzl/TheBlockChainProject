import { Component, inject, input, output } from '@angular/core';
import { ButtonComponent } from '@shared/components/button';
import { ClipBoardIconComponent } from '@shared/components/icons';
import { ModalComponent } from '@shared/components/modal';
import { Block } from '@shared/models/blockchain.model';
import { FileRecord } from '@shared/models/file-record.model';
import { ModalService } from '@shared/services/modal.service';

type BlockWithDateTime<T> = Block<T> & {
  dateTime: string;
};

@Component({
  selector: 'app-modal-block',
  standalone: true,
  imports: [ModalComponent, ClipBoardIconComponent, ButtonComponent],
  templateUrl: './modal-block.component.html',
})
export class ModalBlockComponent {
  private modalService = inject(ModalService);

  block = input<BlockWithDateTime<FileRecord> | null>(null);
  copied = output();
  closed = output();

  async copyText(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn((err as Error).message);
    }

    this.copied.emit();
  }

  closeModal() {
    this.modalService.close();
    this.closed.emit();
  }
}
