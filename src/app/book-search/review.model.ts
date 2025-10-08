/**
 * @fileoverview Modelo de datos para reseñas de libros
 * @description Este archivo define la interfaz Review que establece la estructura
 * de datos para las reseñas y calificaciones de libros en la aplicación BookStore.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

/**
 * @interface Review
 * @description Interfaz que define la estructura de datos para una reseña de libro.
 * Contiene la información necesaria para almacenar y mostrar opiniones y
 * calificaciones de usuarios sobre libros específicos.
 *
 * @example
 * ```typescript
 * const review: Review = {
 *   id: 1,
 *   bookId: 5,
 *   puntuacion: 5,
 *   comentario: 'Excelente libro, muy recomendado para...',
 *   fecha: '2024-10-07'
 * };
 * ```
 */
export interface Review {
  /**
   * @property {number} id
   * @description Identificador único de la reseña en el sistema.
   * Utilizado como clave primaria para operaciones CRUD sobre reseñas.
   */
  id: number;

  /**
   * @property {number} bookId
   * @description Identificador del libro al que pertenece esta reseña.
   * Clave foránea que establece la relación con la entidad Book.
   */
  bookId: number;

  /**
   * @property {number} puntuacion
   * @description Calificación numérica del libro en escala de 1 a 5.
   * Valores válidos: 1 (muy malo), 2 (malo), 3 (regular), 4 (bueno), 5 (excelente).
   * Utilizado para cálculos de promedios y ordenamiento por calidad.
   */
  puntuacion: number;

  /**
   * @property {string} comentario
   * @description Texto descriptivo con la opinión del usuario sobre el libro.
   * Campo de texto libre que proporciona contexto cualitativo a la calificación numérica.
   * Se recomienda una longitud máxima de 500 caracteres para mantener legibilidad.
   */
  comentario: string;

  /**
   * @property {string} fecha
   * @description Fecha de creación de la reseña en formato ISO (YYYY-MM-DD).
   * Utilizada para ordenamiento cronológico y filtros temporales.
   * Se almacena como string para simplificar la serialización y comparaciones.
   */
  fecha: string;
}
