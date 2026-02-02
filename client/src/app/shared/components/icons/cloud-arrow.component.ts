import { Component, input } from '@angular/core';

@Component({
  selector: 'heroicons-cloud-arrow',
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
        d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
      />
    </svg>
  `,
})
export class CloudArrowIconComponent {
  width = input(24);
  height = input(24);
  strokeWidth = input(1.5);
  className = input('');
}
