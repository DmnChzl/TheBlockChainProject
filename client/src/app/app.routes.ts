import { Routes } from '@angular/router';
import { BlockChainPageComponent } from './pages/blockchain/blockchain.component';
import { HomePageComponent } from './pages/home';
import { UploadPageComponent } from './pages/upload';

export const appRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    data: { title: 'Home' },
  },
  {
    path: 'blockchain',
    component: BlockChainPageComponent,
    data: { title: 'BlockChain' },
  },
  {
    path: 'upload',
    component: UploadPageComponent,
    data: { title: 'Upload' },
  },
  {
    path: '**',
    redirectTo: '',
  },
];
