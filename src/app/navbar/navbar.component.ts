import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CartStoreService } from '../cart/cart.store';
import { Observable } from 'rxjs';
import {AsyncPipe, NgClass} from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgClass, AsyncPipe],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  cartItemCount$: Observable<number>;

  constructor(public cartStore: CartStoreService) {
    this.cartItemCount$ = this.cartStore.cartItemCount$;
  }
}
