import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styles: [
    `
      .app-footer {
        display: flex;
        padding: 1.25rem;

        & .app-footer__copyright {
          color: var(--txt-color-50);
          font-size: 14px;
          line-height: 22px;
        }
      }
    `,
  ],
})
export class FooterComponent {
  readonly currentYear = signal(new Date().getFullYear());
}
