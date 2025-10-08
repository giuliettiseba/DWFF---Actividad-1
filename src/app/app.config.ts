/**
 * @fileoverview Configuración de la aplicación Angular
 * @description Este archivo establece la configuración bootstrap de la aplicación
 * incluyendo proveedores de servicios, enrutamiento y características globales.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

/**
 * @const {ApplicationConfig} appConfig
 * @description Configuración principal de la aplicación Angular que define los proveedores
 * y servicios globales necesarios para el funcionamiento del sistema.
 *
 * Características configuradas:
 * - Detección de cambios optimizada con coalesced events
 * - Sistema de enrutamiento con las rutas definidas
 * - Configuración para aplicación standalone (sin NgModule)
 *
 * @example
 * ```typescript
 * // Este objeto se utiliza en main.ts para bootstrap de la aplicación
 * bootstrapApplication(App, appConfig)
 *   .catch((err) => console.error(err));
 * ```
 */
export const appConfig: ApplicationConfig = {
  providers: [
    /**
     * Proveedor de detección de cambios optimizada
     * - eventCoalescing: true - Agrupa eventos del DOM para mejor rendimiento
     * - Reduce el número de ciclos de detección de cambios innecesarios
     */
    provideZoneChangeDetection({ eventCoalescing: true }),

    /**
     * Proveedor del sistema de enrutamiento
     * - Configura Angular Router con las rutas definidas en app.routes.ts
     * - Habilita navegación declarativa y programática entre componentes
     */
    provideRouter(routes)
  ]
};
