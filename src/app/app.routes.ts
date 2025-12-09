/**
 * @fileoverview Configuración de rutas de la aplicación Nexus
 * @description Este archivo define el sistema de enrutamiento que gestiona la navegación
 * entre las diferentes páginas de la aplicación utilizando Angular Router.
 * Incluye rutas para libros, cafetería y contacto.
 * @author Equipo de desarrollo Nexus
 * @version 2.0.0
 * @since 2024
 */

import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { CartComponent } from './cart/cart.component';
import { CafeteriaLanding } from './cafeteria-landing/cafeteria-landing';
import { CafeteriaProducts } from './cafeteria-products/cafeteria-products';
import { CafeteriaCheckout } from './cafeteria-checkout/cafeteria-checkout';
import { ContactForm } from './contact-form/contact-form';

/**
 * @const {Routes} routes
 * @description Configuración de rutas de la aplicación que define el mapeo entre
 * URLs y componentes. Implementa navegación declarativa con carga de componentes.
 *
 * Rutas disponibles:
 * - '/' (raíz): Página de inicio con información general
 * - '/libros': Página de búsqueda y navegación de libros con filtros
 * - '/carrito': Página del carrito de compras de libros
 * - '/cafeteria': Página principal de la cafetería
 * - '/cafeteria/productos': Catálogo de productos de cafetería
 * - '/cafeteria/checkout': Finalización de pedido de cafetería
 * - '/contacto': Formulario de contacto
 * - '**': Ruta comodín que redirige cualquier URL no encontrada al inicio
 *
 * @example
 * ```typescript
 * // Navegación programática en componentes
 * this.router.navigate(['/libros']);
 * this.router.navigate(['/cafeteria/productos']);
 *
 * // Navegación declarativa en templates
 * <a routerLink="/libros">Buscar Libros</a>
 * <a routerLink="/cafeteria">Cafetería</a>
 * ```
 */
export const routes: Routes = [
  /**
   * Ruta raíz: Página de inicio (Landing Page)
   * Presenta información general de Nexus y llamadas a la acción
   */
  {
    path: '',
    component: LandingComponent,
    title: 'Nexus - Librería y Cafetería Universitaria'
  },

  /**
   * Ruta de búsqueda de libros: Catálogo con funcionalidad de filtros
   * Permite búsqueda, filtrado, paginación y gestión de reseñas
   */
  {
    path: 'libros',
    component: BookSearchComponent,
    title: 'Buscar Libros - Nexus'
  },

  /**
   * Ruta del carrito de libros: Gestión de compras
   * Muestra items seleccionados, totales y formulario de pago
   */
  {
    path: 'carrito',
    component: CartComponent,
    title: 'Carrito de Compras - Nexus'
  },

  /**
   * Ruta principal de cafetería: Landing de servicios
   * Presenta información sobre la cafetería y zona coworking
   */
  {
    path: 'cafeteria',
    component: CafeteriaLanding,
    title: 'Cafetería - Nexus'
  },

  /**
   * Ruta de productos de cafetería: Catálogo de bebidas y snacks
   * Permite seleccionar productos y agregarlos al carrito de cafetería
   */
  {
    path: 'cafeteria/productos',
    component: CafeteriaProducts,
    title: 'Productos - Cafetería Nexus'
  },

  /**
   * Ruta de checkout de cafetería: Finalización de pedido
   * Permite seleccionar modalidad de entrega y confirmar pedido
   */
  {
    path: 'cafeteria/checkout',
    component: CafeteriaCheckout,
    title: 'Checkout - Cafetería Nexus'
  },

  /**
   * Ruta de contacto: Formulario reactivo de contacto
   * Permite enviar consultas y sugerencias al equipo
   */
  {
    path: 'contacto',
    component: ContactForm,
    title: 'Contacto - Nexus'
  },

  /**
   * Compatibilidad: Redirección de /buscar a /libros
   */
  {
    path: 'buscar',
    redirectTo: 'libros',
    pathMatch: 'full'
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
