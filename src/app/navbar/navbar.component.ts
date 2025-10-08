import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CartStoreService } from '../cart/cart.store';
import { Observable } from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, AsyncPipe, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartItemCount$: Observable<number>;
  // Controls mobile menu visibility
  mobileMenuOpen = false;

  constructor(public cartStore: CartStoreService) {
    this.cartItemCount$ = this.cartStore.cartItemCount$;
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
