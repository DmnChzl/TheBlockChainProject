import { Component, input } from '@angular/core';

@Component({
  selector: 'heroicons-magnifying-glass',
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
        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
      />
    </svg>
  `,
})
export class MagnifyingGlassIconComponent {
  width = input(24);
  height = input(24);
  strokeWidth = input(1.5);
  className = input('');
}
