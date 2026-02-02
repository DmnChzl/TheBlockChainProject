import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon-diamond',
  standalone: true,
  template: `
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      [attr.width]="width()"
      [attr.height]="height()"
      [attr.viewBox]="viewBox()"
      [attr.class]="className()"
    >
      <path d="M0 12L12 0L24 12L12 24L0 12Z" />
    </svg>
  `,
})
export class DiamondIconComponent {
  width = input(24);
  height = input(24);
  viewBox = input('0 0 24 24');
  className = input('');
}
