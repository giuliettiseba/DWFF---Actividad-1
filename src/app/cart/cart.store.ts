import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../book-search/book.model';

export interface CartItem {
  book: Book;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartStoreService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$: Observable<CartItem[]> = this.cartItemsSubject.asObservable();
  cartItemCount$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((sum, item) => sum + item.quantity, 0))
  );
  cartTotal$: Observable<number> = this.cartItems$.pipe(
    map(items => items.reduce((sum, item) => sum + item.book.precio * item.quantity, 0))
  );

  get cartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }

  addToCart(book: Book): void {
    const items = [...this.cartItems];
    const idx = items.findIndex(item => item.book.id === book.id);
    if (idx > -1) {
      items[idx] = { ...items[idx], quantity: items[idx].quantity + 1 };
    } else {
      items.push({ book, quantity: 1 });
    }
    this.cartItemsSubject.next(items);
  }

  removeFromCart(bookId: number): void {
    let items = [...this.cartItems];
    const idx = items.findIndex(item => item.book.id === bookId);
    if (idx > -1) {
      if (items[idx].quantity > 1) {
        items[idx] = { ...items[idx], quantity: items[idx].quantity - 1 };
      } else {
        items = items.filter(item => item.book.id !== bookId);
      }
      this.cartItemsSubject.next(items);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}
