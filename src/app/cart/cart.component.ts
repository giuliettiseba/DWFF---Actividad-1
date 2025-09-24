import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CartStoreService } from './cart.store';
import { Book } from '../book-search/book.model';
import { Observable } from 'rxjs';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  imports: [CommonModule, FormsModule],
})
export class CartComponent {
  cartItems$: Observable<Book[]>;
  showPaymentDialog = false;
  paymentForm = {
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  };
  paymentError = '';

  constructor(public cartStore: CartStoreService) {
    this.cartItems$ = this.cartStore.cartItems$;
  }

  openPaymentDialog(): void {
    this.showPaymentDialog = true;
    this.paymentError = '';
  }

  closePaymentDialog(): void {
    this.showPaymentDialog = false;
    this.paymentForm = { name: '', number: '', expiry: '', cvv: '' };
    this.paymentError = '';
  }

  submitPayment(): void {
    // Simple validation
    const { name, number, expiry, cvv } = this.paymentForm;
    if (!name || !number || !expiry || !cvv) {
      this.paymentError = 'Todos los campos son obligatorios.';
      return;
    }
    if (!/^\d{16}$/.test(number.replace(/\s/g, ''))) {
      this.paymentError = 'El número de tarjeta debe tener 16 dígitos.';
      return;
    }
    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      this.paymentError = 'La fecha debe tener formato MM/AA.';
      return;
    }
    if (!/^\d{3,4}$/.test(cvv)) {
      this.paymentError = 'El CVV debe tener 3 o 4 dígitos.';
      return;
    }
    // Simulate payment success
    this.closePaymentDialog();
    alert('¡Pago realizado con éxito!');
    this.cartStore.clearCart();
  }

  removeFromCart(bookId: number): void {
    this.cartStore.removeFromCart(bookId);
  }
}
