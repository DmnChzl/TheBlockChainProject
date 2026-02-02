import { Component, computed, input, output } from '@angular/core';
import { ButtonComponent } from '@shared/components/button';
import * as DateUtils from '@shared/utils/dateUtils';
import * as FileUtils from '@shared/utils/fileUtils';

@Component({
  selector: 'app-file-info',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './file-info.component.html',
})
export class FileInfoComponent {
  file = input<File | undefined>(undefined);

  readonly fileDateTime = computed(() => DateUtils.formatDateTime(this.file()?.lastModified ?? 'NaN'));
  readonly fileSize = computed(() => FileUtils.formatBytes(this.file()?.size ?? 0));

  fileEnrolled = output();
  fileVerified = output();
}
