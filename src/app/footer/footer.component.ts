/**
 * @fileoverview Componente de pie de página de la aplicación
 * @description Este componente implementa el pie de página con información de contacto,
 * enlaces de navegación secundarios y detalles sobre la aplicación.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/**
 * @class FooterComponent
 * @description Componente standalone que renderiza el pie de página de la aplicación.
 * Incluye información corporativa, enlaces de navegación, recursos y datos de contacto.
 *
 * @example
 * ```html
 * <app-footer></app-footer>
 * ```
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  /**
   * @property {number} year
   * @description Año actual obtenido dinámicamente para el copyright.
   * Se calcula automáticamente y se mantiene actualizado.
   * @readonly
   */
  readonly year = new Date().getFullYear();

  /**
   * @constructor
   * @description Inicializa el componente de pie de página.
   * No requiere configuración adicional ya que toda la información es estática.
   */
  constructor() {
    // El componente footer es principalmente informativo
    // y no requiere lógica de inicialización compleja
  }
}
