import { Component } from '@angular/core';
import { CubeIconComponent, CubeTransparentIconComponent } from '@shared/components/icons';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CubeIconComponent, CubeTransparentIconComponent],
  templateUrl: './hero.component.html',
})
export class HeroComponent {}
