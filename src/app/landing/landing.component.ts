/**
 * @fileoverview Componente de página de inicio de BookStore
 * @description Este componente implementa la página principal de la aplicación,
 * mostrando información de bienvenida, características principales y llamadas a la acción.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * @class LandingComponent
 * @description Componente standalone que renderiza la página de inicio de la aplicación.
 * Presenta las características principales del servicio BookStore y dirige a los usuarios
 * hacia las funcionalidades principales de búsqueda y compra de libros.
 *
 * @example
 * ```html
 * <app-landing></app-landing>
 * ```
 */
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  /**
   * @constructor
   * @description Inicializa el componente de página de inicio.
   * Este componente es principalmente estático y no requiere lógica de inicialización compleja.
   */
  constructor() {
    // El componente landing es principalmente presentacional
    // y no requiere configuración específica de estado
  }
}
