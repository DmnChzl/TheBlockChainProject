import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  HostListener,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { DualListViewComponent } from '../dual-list-view/dual-list-view.component';
import { ListItemComponent } from '../list-item';
import { ListItem } from '../list-item/list-item.model';

@Component({
  selector: 'app-list-view',
  standalone: true,
  imports: [ListItemComponent, DualListViewComponent],
  templateUrl: './list-view.component.html',
})
export class ListViewComponent {
  items = input<ListItem[]>([]);
  readonly itemsEmpty = computed(() => this.items().length === 0);
  clicked = output<number>();

  mobileView = viewChild<ElementRef<HTMLElement>>('mobileView');

  isMobile = signal(false);
  leftItems = signal<ListItem[]>([]);
  rightItems = signal<ListItem[]>([]);

  constructor() {
    this.setInnerWidth();
    this.splitItemsEffect();
    this.scrollToBottomAfterNextRender();
  }

  handleClickItem(blockIndex: number) {
    this.clicked.emit(blockIndex);
  }

  private setInnerWidth() {
    this.isMobile.set(window.innerWidth < 768);
  }

  private splitItemsEffect() {
    effect(() => {
      if (!this.itemsEmpty()) {
        this.splitItems();
      }
    });
  }

  private splitItems() {
    if (this.isMobile()) return;

    const allItems = this.items();
    const breakpoint = Math.ceil(allItems.length / 2);
    this.leftItems.set(allItems.slice(0, breakpoint));
    this.rightItems.set(allItems.slice(breakpoint));
  }

  @HostListener('window:resize')
  onResize() {
    this.setInnerWidth();
    this.splitItems();
  }

  private scrollToBottomAfterNextRender() {
    afterNextRender({
      write: () => {
        this.scrollToBottom();
      },
    });
  }

  private scrollToBottom() {
    const mobileElement = this.mobileView()?.nativeElement;
    if (mobileElement) {
      mobileElement.scrollTop = mobileElement.scrollHeight;
    }
  }
}
