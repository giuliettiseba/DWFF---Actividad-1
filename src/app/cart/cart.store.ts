import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Book } from '../book-search/book.model';

@Injectable({ providedIn: 'root' })
export class CartStoreService {
  private cartItemsSubject = new BehaviorSubject<Book[]>([]);
  cartItems$: Observable<Book[]> = this.cartItemsSubject.asObservable();

  get cartItems(): Book[] {
    return this.cartItemsSubject.value;
  }

  addToCart(book: Book): void {
    if (!this.cartItems.find(item => item.id === book.id)) {
      this.cartItemsSubject.next([...this.cartItems, book]);
    }
  }

  removeFromCart(bookId: number): void {
    this.cartItemsSubject.next(this.cartItems.filter(item => item.id !== bookId));
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}

