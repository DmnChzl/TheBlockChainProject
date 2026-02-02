import { Component, computed, inject } from '@angular/core';
import { NotificationService } from '@services/notification.service';
import {
  CheckCircleIconComponent,
  CrossCircleIconComponent,
  ExclamationTriangleIconComponent,
  InfoCircleIconComponent,
} from '../icons';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [
    CheckCircleIconComponent,
    CrossCircleIconComponent,
    ExclamationTriangleIconComponent,
    InfoCircleIconComponent,
  ],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css',
})
export class NotificationComponent {
  notificationService = inject(NotificationService);

  readonly hasNotification = computed(() => Boolean(this.notificationService.notification()));
  readonly message = computed(() => this.notificationService.notification()?.message || '');

  readonly isSuccess = computed(() => this.notificationService.notification()?.type === 'success');
  readonly isDanger = computed(() => this.notificationService.notification()?.type === 'danger');
  readonly isWarning = computed(() => this.notificationService.notification()?.type === 'warning');
}
