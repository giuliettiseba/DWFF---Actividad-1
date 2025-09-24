import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { CartComponent } from './cart/cart.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },
  { path: 'buscar', component: BookSearchComponent },
  { path: 'carrito', component: CartComponent }
];
