import { Component, input } from '@angular/core';

@Component({
  selector: 'heroicons-exclamation-triangle',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      [attr.width]="width()"
      [attr.height]="height()"
      viewBox="0 0 24 24"
      [attr.stroke-width]="strokeWidth()"
      stroke="currentColor"
      [attr.class]="className()"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
      />
    </svg>
  `,
})
export class ExclamationTriangleIconComponent {
  width = input(24);
  height = input(24);
  strokeWidth = input(1.5);
  className = input('');
}
