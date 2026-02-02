import { afterNextRender, Component, computed, ElementRef, input, output, signal, viewChild } from '@angular/core';
import { ListItemComponent } from '../list-item';
import { ListItem } from '../list-item/list-item.model';

@Component({
  selector: 'app-dual-list-view',
  standalone: true,
  imports: [ListItemComponent],
  templateUrl: './dual-list-view.component.html',
})
export class DualListViewComponent {
  leftItems = input<ListItem[]>([]);
  rightItems = input<ListItem[]>([]);
  readonly rightItemsEmpty = computed(() => this.rightItems().length === 0);
  clicked = output<number>();

  leftView = viewChild<ElementRef<HTMLElement>>('leftView');
  rightView = viewChild<ElementRef<HTMLElement>>('rightView');

  private isLeftScrolling = signal(false);
  private isRightScrolling = signal(false);

  private leftTimer = signal<number | undefined>(undefined);
  private rightTimer = signal<number | undefined>(undefined);

  constructor() {
    this.scrollToBottomAfterNextRender();
  }

  handleClickItem(blockIndex: number) {
    this.clicked.emit(blockIndex);
  }

  onLeftScroll(event: Event) {
    if (this.isRightScrolling()) return;

    const target = event.target as HTMLElement;
    const rightElement = this.rightView()?.nativeElement;
    if (!rightElement) return;

    this.isLeftScrolling.set(true);

    const scrollPercentage = target.scrollTop / (target.scrollHeight - target.clientHeight);
    const maxScroll = rightElement.scrollHeight - rightElement.clientHeight;
    rightElement.scrollTop = maxScroll * (1 - scrollPercentage);

    if (this.leftTimer()) clearTimeout(this.leftTimer());
    const timer = setTimeout(() => this.isLeftScrolling.set(false), 50);
    this.leftTimer.set(timer);
  }

  onRightScroll(event: Event) {
    if (this.isLeftScrolling()) return;

    const target = event.target as HTMLElement;
    const leftElement = this.leftView()?.nativeElement;
    if (!leftElement) return;

    this.isRightScrolling.set(true);

    const scrollPercentage = target.scrollTop / (target.scrollHeight - target.clientHeight);
    const maxScroll = leftElement.scrollHeight - leftElement.clientHeight;
    leftElement.scrollTop = maxScroll * (1 - scrollPercentage);

    if (this.rightTimer()) clearTimeout(this.rightTimer());
    const timer = setTimeout(() => this.isRightScrolling.set(false), 50);
    this.rightTimer.set(timer);
  }

  scrollToBottomAfterNextRender() {
    afterNextRender({
      write: () => {
        this.scrollToBottom();
      },
    });
  }

  private scrollToBottom() {
    const rightElement = this.rightView()?.nativeElement;
    if (rightElement) {
      rightElement.scrollTop = rightElement.scrollHeight;
    }
  }
}
