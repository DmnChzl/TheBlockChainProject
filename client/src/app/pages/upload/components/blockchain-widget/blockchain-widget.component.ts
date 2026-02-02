import { Component, computed, inject } from '@angular/core';
import { Router } from '@angular/router';
import { EyeIconComponent } from '@shared/components/icons';
import { BlockChainService } from '@shared/services/blockchain.service';

@Component({
  selector: 'app-blockchain-widget',
  standalone: true,
  imports: [EyeIconComponent],
  templateUrl: './blockchain-widget.component.html',
})
export class BlockChainWidgetComponent {
  private router = inject(Router);
  private blockChainService = inject(BlockChainService);

  readonly isBlockChainValid = computed(() => this.blockChainService.state().isValid);
  readonly statusMessage = computed(() => (this.isBlockChainValid() ? 'Safe' : 'Unsafe'));
  readonly totalBlocks = computed(() => this.blockChainService.state().totalBlocks);

  constructor() {
    this.blockChainService.load();
  }

  goToBlockChain() {
    this.router.navigate(['/blockchain']);
  }
}
