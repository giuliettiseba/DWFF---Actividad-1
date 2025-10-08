/**
 * @fileoverview Configuración de rutas de la aplicación BookStore
 * @description Este archivo define el sistema de enrutamiento que gestiona la navegación
 * entre las diferentes páginas de la aplicación utilizando Angular Router.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { CartComponent } from './cart/cart.component';

/**
 * @const {Routes} routes
 * @description Configuración de rutas de la aplicación que define el mapeo entre
 * URLs y componentes. Implementa navegación declarativa con carga lazy de componentes.
 *
 * Rutas disponibles:
 * - '/' (raíz): Página de inicio con información general de BookStore
 * - '/buscar': Página de búsqueda y navegación de libros con filtros
 * - '/carrito': Página del carrito de compras y procesamiento de pagos
 * - '**': Ruta comodín que redirige cualquier URL no encontrada al inicio
 *
 * @example
 * ```typescript
 * // Navegación programática en componentes
 * this.router.navigate(['/buscar']);
 * this.router.navigate(['/carrito']);
 *
 * // Navegación declarativa en templates
 * <a routerLink="/buscar">Buscar Libros</a>
 * <a routerLink="/carrito">Carrito</a>
 * ```
 */
export const routes: Routes = [
  /**
   * Ruta raíz: Página de inicio (Landing Page)
   * Presenta información general de BookStore y llamadas a la acción
   */
  {
    path: '',
    component: LandingComponent,
    title: 'BookStore - Tu librería online'
  },

  /**
   * Ruta de búsqueda: Catálogo de libros con funcionalidad de filtros
   * Permite búsqueda, filtrado, paginación y gestión de reseñas
   */
  {
    path: 'buscar',
    component: BookSearchComponent,
    title: 'Buscar Libros - BookStore'
  },

  /**
   * Ruta del carrito: Gestión de compras y procesamiento de pagos
   * Muestra items seleccionados, totales y formulario de pago
   */
  {
    path: 'carrito',
    component: CartComponent,
    title: 'Carrito de Compras - BookStore'
  },

  /**
   * Ruta comodín: Manejo de URLs no encontradas (404)
   * Redirige automáticamente a la página de inicio para evitar errores
   */
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];
