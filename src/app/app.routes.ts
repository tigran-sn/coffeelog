import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadComponent: () =>
      import('./list/list.component').then((m) => m.ListComponent),
  },
  {
    path: 'coffee',
    loadComponent: () =>
      import('./coffee/coffee.component').then((m) => m.CoffeeComponent),
  },
  {
    path: 'coffee/:id',
    loadComponent: () =>
      import('./coffee/coffee.component').then((m) => m.CoffeeComponent),
  },
];
