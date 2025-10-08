/**
 * @fileoverview Servicio de búsqueda y gestión de libros
 * @description Este servicio encapsula todas las operaciones relacionadas con libros
 * y reseñas, incluyendo búsqueda, filtrado y operaciones CRUD sobre reseñas.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Book } from './book.model';
import { Review } from './review.model';

/**
 * @class BookSearchService
 * @description Servicio singleton que gestiona todas las operaciones relacionadas
 * con libros y reseñas. Simula una API REST mediante datos estáticos y
 * proporciona funcionalidades de búsqueda, filtrado y gestión de reseñas.
 *
 * @example
 * ```typescript
 * constructor(private bookService: BookSearchService) {}
 *
 * // Obtener todos los libros
 * this.bookService.getAllBooks().subscribe(books => {
 *   console.log(books);
 * });
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class BookSearchService {

  /**
   * @property {Book[]} books
   * @description Colección estática de libros que simula una base de datos.
   * Contiene información completa de cada libro incluyendo precio, imagen y sinopsis.
   * @private
   */
  private books: Book[] = [
    // ...existing code...
  ];

  /**
   * @property {Review[]} reviews
   * @description Colección estática de reseñas que simula una base de datos.
   * Cada reseña está asociada a un libro específico mediante bookId.
   * @private
   */
  private reviews: Review[] = [
    // ...existing code...
  ];

  /**
   * @constructor
   * @description Inicializa el servicio. No requiere configuración adicional
   * ya que utiliza datos estáticos para la simulación.
   */
  constructor() { }

  /**
   * @method getAllBooks
   * @description Obtiene todos los libros disponibles, opcionalmente filtrados por categoría.
   * Simula una llamada asíncrona a una API REST.
   *
   * @param {string} [category] - Categoría opcional para filtrar los libros
   * @returns {Observable<Book[]>} Observable que emite la lista de libros
   *
   * @example
   * ```typescript
   * // Obtener todos los libros
   * this.bookService.getAllBooks().subscribe(books => {
   *   this.allBooks = books;
   * });
   *
   * // Obtener libros por categoría
   * this.bookService.getAllBooks('Novela').subscribe(books => {
   *   this.novelBooks = books;
   * });
   * ```
   */
  getAllBooks(category?: string): Observable<Book[]> {
    if (category) {
      // Filtrar libros por categoría específica
      const filteredBooks = this.books.filter(book => book.categoria === category);
      return of(filteredBooks);
    }
    // Retornar todos los libros disponibles
    return of(this.books);
  }

  /**
   * @method getReviews
   * @description Obtiene todas las reseñas asociadas a un libro específico.
   * Simula una consulta asíncrona a la base de datos.
   *
   * @param {number} bookId - Identificador único del libro
   * @returns {Observable<Review[]>} Observable que emite las reseñas del libro
   *
   * @example
   * ```typescript
   * this.bookService.getReviews(1).subscribe(reviews => {
   *   this.bookReviews = reviews;
   * });
   * ```
   */
  getReviews(bookId: number): Observable<Review[]> {
    // Filtrar reseñas por ID de libro
    const bookReviews = this.reviews.filter(review => review.bookId === bookId);
    return of(bookReviews);
  }

  /**
   * @method addReview
   * @description Agrega una nueva reseña a un libro específico.
   * Simula la creación de un registro en la base de datos.
   *
   * @param {number} bookId - Identificador único del libro
   * @param {Object} reviewData - Datos de la nueva reseña
   * @param {number} reviewData.puntuacion - Puntuación de 1 a 5
   * @param {string} reviewData.comentario - Comentario textual de la reseña
   * @returns {Observable<Review>} Observable que emite la reseña creada
   *
   * @example
   * ```typescript
   * const newReview = { puntuacion: 5, comentario: 'Excelente libro' };
   * this.bookService.addReview(1, newReview).subscribe(review => {
   *   console.log('Reseña agregada:', review);
   * });
   * ```
   */
  addReview(bookId: number, reviewData: { puntuacion: number; comentario: string }): Observable<Review> {
    // Crear nueva reseña con ID auto-generado
    const newReview: Review = {
      id: this.reviews.length + 1, // Simular auto-incremento
      bookId: bookId,
      puntuacion: reviewData.puntuacion,
      comentario: reviewData.comentario,
      fecha: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
    };

    // Agregar a la colección local
    this.reviews.push(newReview);

    // Retornar la reseña creada
    return of(newReview);
  }
}
