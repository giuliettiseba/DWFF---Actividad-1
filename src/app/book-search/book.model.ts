/**
 * @fileoverview Modelo de datos para libros
 * @description Este archivo define la interfaz Book que establece la estructura
 * de datos para los libros en la aplicación BookStore.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

/**
 * @interface Book
 * @description Interfaz que define la estructura de datos para un libro en el sistema.
 * Contiene toda la información necesaria para mostrar, buscar y procesar libros
 * en la aplicación de comercio electrónico.
 *
 * @example
 * ```typescript
 * const book: Book = {
 *   id: 1,
 *   titulo: 'Don Quijote de la Mancha',
 *   autor: 'Miguel de Cervantes',
 *   año: 1605,
 *   categoria: 'Novela',
 *   imagen: 'https://example.com/quijote.jpg',
 *   sinopsis: 'Las aventuras del ingenioso hidalgo...',
 *   precio: 25.99
 * };
 * ```
 */
export interface Book {
  /**
   * @property {number} id
   * @description Identificador único del libro en el sistema.
   * Utilizado como clave primaria para operaciones CRUD.
   */
  id: number;

  /**
   * @property {string} titulo
   * @description Título completo del libro.
   * Campo principal para búsquedas y visualización.
   */
  titulo: string;

  /**
   * @property {string} autor
   * @description Nombre del autor o autores del libro.
   * Utilizado para filtros y búsquedas por autor.
   */
  autor: string;

  /**
   * @property {number} año
   * @description Año de publicación del libro.
   * Permite filtros cronológicos y ordenamiento temporal.
   * Nota: Se utiliza la grafía española 'año' por consistencia con el dominio.
   */
  año: number;

  /**
   * @property {string} categoria
   * @description Categoría o género literario del libro.
   * Valores típicos: 'Novela', 'Ciencia', 'Historia', 'Infantil'.
   * Utilizado para filtros por categoría y organización.
   */
  categoria: string;

  /**
   * @property {string} imagen
   * @description URL de la imagen de portada del libro.
   * Debe ser una URL válida que apunte a un recurso de imagen accesible.
   */
  imagen: string;

  /**
   * @property {string} sinopsis
   * @description Resumen o descripción breve del contenido del libro.
   * Proporciona contexto adicional para ayudar en la decisión de compra.
   */
  sinopsis: string;

  /**
   * @property {number} precio
   * @description Precio del libro en la moneda base del sistema.
   * Valor numérico utilizado para cálculos de carrito y totales.
   * Se asume formato decimal con dos dígitos de precisión.
   */
  precio: number;

  [property: string]: any;
}
