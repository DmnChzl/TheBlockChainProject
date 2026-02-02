import { Component, computed, effect, input, signal } from '@angular/core';
import { FooterComponent } from '@components/footer';
import { HeaderComponent } from '@components/header';
import { DiamondIconComponent } from '@components/icons';

const STORAGE_KEY = 'chain-ctx';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, DiamondIconComponent],
  templateUrl: './main.component.html',
})
export class MainLayoutComponent {
  title = input('');
  headerBorder = input(true);
  // footerBorder = input(true);

  theme = signal<string>('light');
  readonly isDarkMode = computed(() => this.theme() === 'dark');

  constructor() {
    this.setDocumentTitle();
    this.restoreTheme();
    this.watchThemeChanges();
  }

  private setDocumentTitle() {
    effect(() => {
      if (this.title()) document.title = this.title();
    });
  }

  private restoreTheme() {
    const stored = this.getStoredTheme();
    this.setTheme(stored);
  }

  private watchThemeChanges() {
    effect(() => {
      document.documentElement.classList.toggle('dark', this.isDarkMode());
    });
  }

  private getStoredTheme(): string {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      const json = JSON.parse(item ?? '{}') as { theme?: string };
      return json.theme === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

  private setTheme(value: string) {
    this.theme.set(value);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ theme: value }));
  }

  onThemeToggle() {
    const value = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(value);
  }
}
