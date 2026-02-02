import { Component, computed, input, output } from '@angular/core';
import { DiamondIconComponent } from '@shared/components/icons';
import { ListItem } from './list-item.model';

@Component({
  selector: 'app-list-item',
  standalone: true,
  imports: [DiamondIconComponent],
  templateUrl: './list-item.component.html',
})
export class ListItemComponent {
  item = input<ListItem | undefined>(undefined);

  readonly hasTitle = computed(() => Boolean(this.item()?.title));
  readonly hasSubTitle = computed(() => Boolean(this.item()?.subTitle));

  clicked = output();
}
