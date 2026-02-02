import { Component, computed, input, output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MoonIconComponent, SunIconComponent } from '../icons';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, MoonIconComponent, SunIconComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  theme = input<string>('light');
  readonly isDarkMode = computed(() => this.theme() === 'dark');
  themeToggled = output();
}
