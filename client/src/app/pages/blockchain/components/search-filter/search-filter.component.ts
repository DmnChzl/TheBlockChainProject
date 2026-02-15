import { Component, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CrossIconComponent, MagnifyingGlassIconComponent } from '@shared/components/icons';

@Component({
  selector: 'app-search-filter',
  standalone: true,
  imports: [FormsModule, MagnifyingGlassIconComponent, CrossIconComponent],
  templateUrl: './search-filter.component.html',
})
export class SearchFilterComponent {
  searchText = model('');
}
