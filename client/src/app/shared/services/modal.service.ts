import { Injectable, signal } from '@angular/core';
import { IconName } from '../components/icons/icon.component';

export interface ModalConfig {
  icon?: IconName;
  title?: string;
  description?: string;
  isCloseable?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpen = signal(false);
  config = signal<ModalConfig>({});

  open(config: ModalConfig = {}) {
    this.config.set({
      isCloseable: true,
      ...config,
    });

    this.isOpen.set(true);
  }

  close() {
    this.isOpen.set(false);
  }
}
