/**
 * @fileoverview Componente de carrito de compras
 * @description Este componente gestiona la visualización y manipulación del carrito de compras,
 * incluyendo la eliminación de items, cálculo de totales y procesamiento de pagos.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import { Component } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { CartStoreService, CartItem } from './cart.store';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

/**
 * @class CartComponent
 * @description Componente standalone que gestiona la interfaz del carrito de compras.
 * Permite visualizar items, eliminar productos, calcular totales y procesar pagos
 * mediante un formulario modal de tarjeta de crédito.
 *
 * @example
 * ```html
 * <app-cart></app-cart>
 * ```
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  // === Propiedades de estado del carrito ===

  /**
   * @property {Observable<CartItem[]>} cartItems$
   * @description Observable que emite la lista actual de items en el carrito.
   * Se actualiza automáticamente cuando se agregan o eliminan productos.
   */
  cartItems$: Observable<CartItem[]>;

  /**
   * @property {Observable<number>} cartTotal$
   * @description Observable que emite el total calculado del carrito.
   * Incluye precio por cantidad de cada item.
   */
  cartTotal$: Observable<number>;

  // === Propiedades de interfaz de usuario ===

  /**
   * @property {boolean} showPaymentDialog
   * @description Controla la visibilidad del modal de pago.
   * @default false
   */
  showPaymentDialog = false;

  // === Propiedades del formulario de pago ===

  /**
   * @property {Object} paymentForm
   * @description Objeto que contiene los datos del formulario de pago.
   * @property {string} paymentForm.name - Nombre en la tarjeta
   * @property {string} paymentForm.number - Número de tarjeta
   * @property {string} paymentForm.expiry - Fecha de expiración (MM/AA)
   * @property {string} paymentForm.cvv - Código de seguridad
   */
  paymentForm = {
    name: '',
    number: '',
    expiry: '',
    cvv: ''
  };

  /**
   * @property {string} paymentError
   * @description Mensaje de error en caso de fallo en el procesamiento del pago.
   */
  paymentError = '';

  /**
   * @constructor
   * @description Inicializa el componente del carrito y establece las suscripciones
   * a los observables del servicio de carrito.
   * @param {CartStoreService} cartStore - Servicio de gestión del carrito de compras
   */
  constructor(private cartStore: CartStoreService) {
    this.cartItems$ = this.cartStore.cartItems$;
    this.cartTotal$ = this.cartStore.cartTotal$;
  }

  // === Métodos de gestión del carrito ===

  /**
   * @method removeFromCart
   * @description Elimina un libro específico del carrito de compras.
   * Utiliza el ID del libro para identificar el item a eliminar.
   * @param {number} bookId - Identificador único del libro a eliminar
   * @returns {void}
   */
  removeFromCart(bookId: number): void {
    this.cartStore.removeFromCart(bookId);
  }

  // === Métodos de gestión del modal de pago ===

  /**
   * @method openPaymentDialog
   * @description Abre el modal de pago y reinicia el formulario.
   * Limpia cualquier error previo y establece valores por defecto.
   * @returns {void}
   */
  openPaymentDialog(): void {
    this.showPaymentDialog = true;
    this.paymentError = '';
    // Reiniciar formulario de pago
    this.paymentForm = {
      name: '',
      number: '',
      expiry: '',
      cvv: ''
    };
  }

  /**
   * @method closePaymentDialog
   * @description Cierra el modal de pago y limpia los datos del formulario.
   * @returns {void}
   */
  closePaymentDialog(): void {
    this.showPaymentDialog = false;
    this.paymentError = '';
  }

  /**
   * @method submitPayment
   * @description Procesa el formulario de pago y simula una transacción.
   * Valida los datos básicos y muestra confirmación o error según corresponda.
   * @returns {void}
   */
  submitPayment(): void {
    // Validación básica del formulario
    if (!this.paymentForm.name || !this.paymentForm.number ||
        !this.paymentForm.expiry || !this.paymentForm.cvv) {
      this.paymentError = 'Por favor complete todos los campos.';
      return;
    }

    // Validación del número de tarjeta (longitud mínima)
    if (this.paymentForm.number.replace(/\s/g, '').length < 13) {
      this.paymentError = 'Número de tarjeta inválido.';
      return;
    }

    // Simulación de procesamiento de pago
    // En una aplicación real, aquí se integraría con un procesador de pagos
    setTimeout(() => {
      // Simular éxito del pago
      alert('¡Pago procesado exitosamente! Gracias por su compra.');
      this.cartStore.clearCart(); // Vaciar carrito tras compra exitosa
      this.closePaymentDialog();
    }, 1000);
  }
}
