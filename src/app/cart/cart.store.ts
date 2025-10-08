/**
 * @fileoverview Servicio de gestión del estado del carrito de compras
 * @description Este servicio implementa el patrón de store para gestionar el estado
 * del carrito de compras utilizando RxJS y BehaviorSubject para reactividad.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Book } from '../book-search/book.model';

/**
 * @interface CartItem
 * @description Interfaz que define la estructura de un item en el carrito.
 * Extiende la información del libro con datos específicos del carrito.
 */
export interface CartItem {
  /** @property {Book} book - Información completa del libro */
  book: Book;
  /** @property {number} quantity - Cantidad de este libro en el carrito */
  quantity: number;
}

/**
 * @class CartStoreService
 * @description Servicio singleton que gestiona el estado global del carrito de compras.
 * Implementa operaciones CRUD sobre items del carrito y mantiene estado reactivo
 * mediante observables para sincronización automática con componentes.
 *
 * @example
 * ```typescript
 * constructor(private cartStore: CartStoreService) {
 *   // Suscribirse a cambios en el carrito
 *   this.cartStore.cartItems$.subscribe(items => {
 *     console.log('Items en carrito:', items);
 *   });
 * }
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class CartStoreService {

  /**
   * @property {BehaviorSubject<CartItem[]>} cartItemsSubject
   * @description Subject que mantiene el estado actual del carrito.
   * BehaviorSubject emite el último valor inmediatamente a nuevos suscriptores.
   * @private
   */
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);

  // === Observables públicos para componentes ===

  /**
   * @property {Observable<CartItem[]>} cartItems$
   * @description Observable público que emite la lista actual de items del carrito.
   * Los componentes se suscriben a este observable para actualizaciones automáticas.
   * @readonly
   */
  cartItems$ = this.cartItemsSubject.asObservable();

  /**
   * @property {Observable<number>} cartItemCount$
   * @description Observable que emite el número total de items en el carrito.
   * Calcula la suma de cantidades de todos los items.
   * @readonly
   */
  cartItemCount$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + item.quantity, 0))
  );

  /**
   * @property {Observable<number>} cartTotal$
   * @description Observable que emite el total monetario del carrito.
   * Calcula precio × cantidad para cada item y suma el total.
   * @readonly
   */
  cartTotal$ = this.cartItems$.pipe(
    map(items => items.reduce((total, item) => total + (item.book.precio * item.quantity), 0))
  );

  /**
   * @constructor
   * @description Inicializa el servicio del carrito.
   * El estado inicial es un carrito vacío.
   */
  constructor() {
    // El carrito inicia vacío
    // El estado se maneja completamente a través de BehaviorSubject
  }

  /**
   * @method addToCart
   * @description Agrega un libro al carrito o incrementa su cantidad si ya existe.
   * Mantiene la inmutabilidad del estado creando nuevas instancias de arrays.
   *
   * @param {Book} book - Libro a agregar al carrito
   * @returns {void}
   *
   * @example
   * ```typescript
   * const book: Book = { id: 1, titulo: 'Don Quijote', ... };
   * this.cartStore.addToCart(book);
   * ```
   */
  addToCart(book: Book): void {
    const currentItems = this.cartItemsSubject.value;
    const existingItem = currentItems.find(item => item.book.id === book.id);

    if (existingItem) {
      // Si el libro ya existe, incrementar cantidad
      const updatedItems = currentItems.map(item =>
        item.book.id === book.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      this.cartItemsSubject.next(updatedItems);
    } else {
      // Si es un libro nuevo, agregarlo con cantidad 1
      const newItem: CartItem = { book, quantity: 1 };
      this.cartItemsSubject.next([...currentItems, newItem]);
    }
  }

  /**
   * @method removeFromCart
   * @description Elimina completamente un libro del carrito independientemente de la cantidad.
   * Utiliza filtrado para crear un nuevo array sin el item especificado.
   *
   * @param {number} bookId - ID del libro a eliminar del carrito
   * @returns {void}
   *
   * @example
   * ```typescript
   * this.cartStore.removeFromCart(1); // Elimina libro con ID 1
   * ```
   */
  removeFromCart(bookId: number): void {
    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.filter(item => item.book.id !== bookId);
    this.cartItemsSubject.next(updatedItems);
  }

  /**
   * @method clearCart
   * @description Vacía completamente el carrito eliminando todos los items.
   * Útil después de completar una compra exitosa.
   *
   * @returns {void}
   *
   * @example
   * ```typescript
   * // Después de procesar pago exitoso
   * this.cartStore.clearCart();
   * ```
   */
  clearCart(): void {
    this.cartItemsSubject.next([]);
  }

  /**
   * @method updateQuantity
   * @description Actualiza la cantidad de un item específico en el carrito.
   * Si la cantidad llega a 0 o menos, elimina el item del carrito.
   *
   * @param {number} bookId - ID del libro a actualizar
   * @param {number} quantity - Nueva cantidad (debe ser positiva)
   * @returns {void}
   *
   * @example
   * ```typescript
   * this.cartStore.updateQuantity(1, 3); // Establecer cantidad a 3
   * this.cartStore.updateQuantity(1, 0); // Eliminar del carrito
   * ```
   */
  updateQuantity(bookId: number, quantity: number): void {
    if (quantity <= 0) {
      // Si la cantidad es 0 o negativa, eliminar el item
      this.removeFromCart(bookId);
      return;
    }

    const currentItems = this.cartItemsSubject.value;
    const updatedItems = currentItems.map(item =>
      item.book.id === bookId
        ? { ...item, quantity }
        : item
    );
    this.cartItemsSubject.next(updatedItems);
  }

  /**
   * @method getCartItems
   * @description Obtiene una instantánea síncrona del estado actual del carrito.
   * Útil para operaciones que requieren el valor inmediato sin suscripción.
   *
   * @returns {CartItem[]} Array actual de items en el carrito
   *
   * @example
   * ```typescript
   * const currentItems = this.cartStore.getCartItems();
   * console.log('Items actuales:', currentItems);
   * ```
   */
  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value;
  }
}
