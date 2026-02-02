import { CommonModule } from '@angular/common';
import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  disabled = input(false);
  variant = input('neutral');
  readonly variantClass = computed(() => `${this.variant()}-button`);
  clicked = output();
}
