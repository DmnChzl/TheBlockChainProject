import { Component, input, output, signal } from '@angular/core';
import { CloudArrowIconComponent } from '../icons';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CloudArrowIconComponent],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent {
  description = input('Lorem ipsum dolor sit amet');
  fileSelected = output<File>();
  isDragging = signal(false);

  onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(true);
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging.set(false);

    const [file] = event.dataTransfer?.files ?? [];
    if (file) this.fileSelected.emit(file);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const [file] = input.files ?? [];
    if (file) this.fileSelected.emit(file);
  }
}
