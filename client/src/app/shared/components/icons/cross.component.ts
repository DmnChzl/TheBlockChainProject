import { Component, input } from '@angular/core';

@Component({
  selector: 'heroicons-cross',
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
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  `,
})
export class CrossIconComponent {
  width = input(24);
  height = input(24);
  strokeWidth = input(1.5);
  className = input('');
}
