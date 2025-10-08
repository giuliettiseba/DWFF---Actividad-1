/**
 * @fileoverview Componente de barra de navegación principal
 * @description Este componente implementa la navegación principal de la aplicación
 * con funcionalidad responsive que incluye un menú hamburguesa para dispositivos móviles.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';
import { CartStoreService } from '../cart/cart.store';
import { Observable } from 'rxjs';
import {AsyncPipe, NgIf} from '@angular/common';

/**
 * @class NavbarComponent
 * @description Componente standalone que gestiona la barra de navegación principal
 * de la aplicación. Incluye enlaces de navegación, contador de items del carrito
 * y funcionalidad responsive con menú móvil.
 *
 * @implements OnInit
 * @example
 * ```html
 * <app-navbar></app-navbar>
 * ```
 */
@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, AsyncPipe, NgIf],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  /**
   * @property {Observable<number>} cartItemCount$
   * @description Observable que emite el número total de items en el carrito de compras.
   * Se actualiza automáticamente cuando se agregan o eliminan productos.
   */
  cartItemCount$: Observable<number>;

  /**
   * @property {boolean} mobileMenuOpen
   * @description Estado del menú móvil. Controla la visibilidad del menú hamburguesa
   * en dispositivos con pantallas pequeñas.
   * @default false
   */
  mobileMenuOpen = false;

  /**
   * @constructor
   * @description Inicializa el componente de navegación y establece la suscripción
   * al observable del contador de items del carrito.
   * @param {CartStoreService} cartStore - Servicio de gestión del carrito de compras
   */
  constructor(public cartStore: CartStoreService) {
    this.cartItemCount$ = this.cartStore.cartItemCount$;
  }

  /**
   * @method toggleMobileMenu
   * @description Alterna el estado de visibilidad del menú móvil.
   * Utilizado por el botón hamburguesa en dispositivos móviles.
   * @returns {void}
   */
  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  /**
   * @method closeMobileMenu
   * @description Cierra el menú móvil estableciendo su estado a false.
   * Se ejecuta automáticamente al hacer clic en un enlace de navegación.
   * @returns {void}
   */
  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }
}
