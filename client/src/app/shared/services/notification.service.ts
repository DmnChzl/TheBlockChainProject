import { Injectable, signal } from '@angular/core';

type NotificationType = 'info' | 'success' | 'danger' | 'warning';

interface Notification {
  message: string;
  type: NotificationType;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  notification = signal<Notification | null>(null);

  private timer: ReturnType<typeof setTimeout> | undefined = undefined;

  show(message: string, type: NotificationType, duration = 5000) {
    if (this.timer) clearTimeout(this.timer);
    this.notification.set({ message, type });

    this.timer = setTimeout(() => {
      this.clear();
    }, duration);
  }

  info(message: string) {
    this.show(message, 'info');
  }

  success(message: string) {
    this.show(message, 'success');
  }

  danger(message: string) {
    this.show(message, 'danger');
  }

  warning(message: string) {
    this.show(message, 'warning');
  }

  clear() {
    this.notification.set(null);
  }
}
