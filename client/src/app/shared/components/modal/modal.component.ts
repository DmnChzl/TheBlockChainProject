import { Component, inject, output } from '@angular/core';
import { ModalService } from '@services/modal.service';
import { IconComponent } from '../icons/icon.component';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
})
export class ModalComponent {
  modalService = inject(ModalService);
  closed = output();

  close() {
    this.modalService.close();
    this.closed.emit();
  }

  handleClick(event: MouseEvent) {
    if (event.target === event.currentTarget) {
      if (this.modalService.config().isCloseable) {
        this.close();
      }
    }
  }
}
