import { NgComponentOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { CheckCircleIconComponent } from './check-circle.component';
import { CrossCircleIconComponent } from './cross-circle.component';
import { CubeIconComponent } from './cube.component';
import { ExclamationTriangleIconComponent } from './exclamation-triangle.component';
import { InfoCircleIconComponent } from './info-circle.component';
import { CrossIconComponent } from './cross.component';

const ICONS_REGISTRY = {
  'check-circle': CheckCircleIconComponent,
  'cross-circle': CrossCircleIconComponent,
  cross: CrossIconComponent,
  cube: CubeIconComponent,
  'exclamation-triangle': ExclamationTriangleIconComponent,
  'info-circle': InfoCircleIconComponent,
} as const;

export type IconName = keyof typeof ICONS_REGISTRY;

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [NgComponentOutlet],
  template: `<ng-container *ngComponentOutlet="iconComponent(); inputs: iconInputs()"></ng-container>`,
})
export class IconComponent {
  name = input<IconName>('cube');

  width = input(24);
  height = input(24);
  strokeWidth = input(1.5);
  className = input('');

  readonly iconComponent = computed(() => ICONS_REGISTRY[this.name()]);
  readonly iconInputs = computed(() => ({
    width: this.width(),
    height: this.height(),
    strokeWidth: this.strokeWidth(),
    className: this.className(),
  }));
}
