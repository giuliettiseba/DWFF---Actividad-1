/**
 * Modelo de datos para productos de cafetería
 *
 * @description Define la estructura de un producto de la cafetería
 * @author Sistema de Cafetería Nexus
 * @date 2025-12-08
 */

export interface CafeteriaProduct {
  /**
   * Identificador único del producto
   */
  id: number;

  /**
   * Nombre del producto
   */
  nombre: string;

  /**
   * URL de la imagen del producto
   */
  imagen: string;

  /**
   * Precio del producto en euros
   */
  precio: number;

  /**
   * Categoría del producto (café, bebida, snack)
   */
  categoria: 'cafe' | 'bebida' | 'snack';

  /**
   * Descripción detallada del producto
   */
  descripcion: string;

  /**
   * Disponibilidad del producto
   */
  disponible?: boolean;
}

