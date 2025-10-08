/**
 * @fileoverview Componente raíz de la aplicación BookStore
 * @description Este archivo define el componente principal que actúa como contenedor
 * de toda la aplicación Angular. Incluye la estructura básica de navegación,
 * contenido principal y pie de página.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

/**
 * @class App
 * @description Componente raíz de la aplicación que define la estructura principal
 * de la interfaz de usuario. Este componente standalone integra los elementos
 * fundamentales: barra de navegación, contenido dinámico y pie de página.
 *
 * @example
 * ```html
 * <app-root></app-root>
 * ```
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  /**
   * @constructor
   * @description Constructor del componente raíz. No requiere inicialización
   * específica ya que la aplicación utiliza componentes standalone y
   * enrutamiento declarativo.
   */
  constructor() {
    // El componente raíz no requiere lógica de inicialización específica
    // La configuración se maneja a través del sistema de enrutamiento de Angular
  }
}
