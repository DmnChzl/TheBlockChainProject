import { Component, input } from '@angular/core';

@Component({
  selector: 'heroicons-cross-circle',
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
        d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
      />
    </svg>
  `,
})
export class CrossCircleIconComponent {
  width = input(24);
  height = input(24);
  strokeWidth = input(1.5);
  className = input('');
}
