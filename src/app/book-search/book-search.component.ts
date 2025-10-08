/**
 * @fileoverview Componente de búsqueda y navegación de libros
 * @description Este componente implementa la funcionalidad principal de búsqueda,
 * filtrado, paginación y gestión de reseñas de libros en la aplicación BookStore.
 * @author Equipo de desarrollo BookStore
 * @version 1.0.0
 * @since 2024
 */

import {Component, OnInit} from '@angular/core';
import {Book} from './book.model';
import {BookSearchService} from './book-search.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CartStoreService} from '../cart/cart.store';
import {Review} from './review.model';

/**
 * @class BookSearchComponent
 * @description Componente principal para la búsqueda y navegación de libros.
 * Implementa filtros avanzados, paginación, gestión de reseñas y funcionalidad
 * para agregar libros al carrito de compras.
 *
 * @implements OnInit
 * @example
 * ```html
 * <app-book-search></app-book-search>
 * ```
 */
@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})

export class BookSearchComponent implements OnInit {
  // === Propiedades de datos de libros ===

  /**
   * @property {Book[]} allBooks
   * @description Colección completa de libros obtenida del servidor.
   * Sirve como fuente de datos para aplicar filtros locales.
   */
  allBooks: Book[] = [];

  /**
   * @property {Book[]} filteredBooks
   * @description Libros filtrados según los criterios de búsqueda aplicados.
   * Resultado de aplicar filtros sobre allBooks.
   */
  filteredBooks: Book[] = [];

  /**
   * @property {Book[]} books
   * @description Subconjunto de libros para la página actual.
   * Resultado de aplicar paginación sobre filteredBooks.
   */
  books: Book[] = [];

  // === Propiedades de filtros y paginación ===

  /**
   * @property {Object} filters
   * @description Objeto que contiene todos los criterios de filtrado disponibles.
   * @property {string} filters.title - Filtro por título del libro
   * @property {string} filters.author - Filtro por autor del libro
   * @property {string} filters.year - Filtro por año de publicación
   * @property {string} filters.category - Filtro por categoría del libro
   */
  filters = {
    title: '',
    author: '',
    year: '',
    category: ''
  };

  /**
   * @property {number} page
   * @description Número de página actual en la paginación.
   * @default 1
   */
  page = 1;

  /**
   * @property {number} limit
   * @description Número máximo de libros a mostrar por página.
   * @default 6
   */
  limit = 6;

  /**
   * @property {number} total
   * @description Total de libros que cumplen con los filtros aplicados.
   */
  total = 0;

  /**
   * @property {number} totalPages
   * @description Número total de páginas disponibles según el total y el límite.
   */
  totalPages = 1;

  // === Propiedades de interfaz de usuario ===

  /**
   * @property {boolean} showConfirmation
   * @description Controla la visibilidad del mensaje de confirmación
   * cuando se agrega un libro al carrito.
   * @default false
   */
  showConfirmation = false;

  /**
   * @property {Book | null} lastAddedBook
   * @description Referencia al último libro agregado al carrito.
   * Se utiliza para mostrar el mensaje de confirmación.
   */
  lastAddedBook: Book | null = null;

  // === Propiedades de gestión de reseñas ===

  /**
   * @property {Object} reviews
   * @description Mapa que asocia IDs de libros con sus respectivas reseñas.
   * Permite mostrar/ocultar reseñas por libro de forma independiente.
   */
  reviews: { [bookId: number]: Review[] } = {};

  /**
   * @property {Object} newReview
   * @description Mapa que almacena los datos de nuevas reseñas en proceso de creación.
   * Indexado por ID de libro para permitir múltiples reseñas simultáneas.
   */
  newReview: { [bookId: number]: { puntuacion: number; comentario: string } } = {};

  /**
   * @property {Object} loadingReviews
   * @description Mapa que controla el estado de carga de reseñas por libro.
   * Permite mostrar indicadores de carga específicos para cada libro.
   */
  loadingReviews: { [bookId: number]: boolean } = {};

  /**
   * @property {Object} submittingReview
   * @description Mapa que controla el estado de envío de nuevas reseñas.
   * Previene envíos duplicados y proporciona feedback visual.
   */
  submittingReview: { [bookId: number]: boolean } = {};

  /**
   * @constructor
   * @description Inicializa el componente con las dependencias necesarias.
   * @param {BookSearchService} bookService - Servicio para operaciones con libros y reseñas
   * @param {CartStoreService} cartStore - Servicio de gestión del carrito de compras
   */
  constructor(private bookService: BookSearchService, public cartStore: CartStoreService) {
  }

  /**
   * @method ngOnInit
   * @description Método del ciclo de vida que se ejecuta tras la inicialización del componente.
   * Carga la lista inicial de libros desde el servidor.
   * @returns {void}
   */
  ngOnInit(): void {
    this.fetchBooks();
  }

  /**
   * @method fetchBooks
   * @description Obtiene la lista de libros desde el servidor, opcionalmente filtrada por categoría.
   * Actualiza allBooks y aplica filtros locales posteriores.
   * @returns {void}
   */
  fetchBooks(): void {
    const category = this.filters.category || undefined;
    this.bookService.getAllBooks(category).subscribe((books) => {
      this.allBooks = books;
      this.applyFilters(true);
    });
  }

  /**
   * @method applyFilters
   * @description Aplica los filtros de búsqueda sobre la colección de libros.
   * Puede recargar datos del servidor o trabajar con datos locales.
   * @param {boolean} fromApi - Indica si los datos provienen directamente de la API
   * @returns {void}
   */
  applyFilters(fromApi = false): void {
    if (!fromApi) {
      this.fetchBooks();
      return;
    }
    // Aplicar filtros locales sobre allBooks
    this.filteredBooks = this.allBooks.filter(book => {
      const matchesTitle = this.filters.title ? book.titulo.toLowerCase().includes(this.filters.title.toLowerCase()) : true;
      const matchesAuthor = this.filters.author ? book.autor.toLowerCase().includes(this.filters.author.toLowerCase()) : true;
      const matchesYear = this.filters.year ? String(book['año']).includes(this.filters.year) : true;
      return matchesTitle && matchesAuthor && matchesYear;
    });
    // Actualizar metadatos de paginación
    this.total = this.filteredBooks.length;
    this.totalPages = Math.max(1, Math.ceil(this.total / this.limit));
    this.page = Math.min(this.page, this.totalPages);
    this.paginate();
  }

  /**
   * @method paginate
   * @description Calcula y establece el subconjunto de libros para la página actual.
   * Utiliza slice() para extraer elementos según página y límite.
   * @returns {void}
   */
  paginate(): void {
    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;
    this.books = this.filteredBooks.slice(start, end);
  }

  /**
   * @method onFilterChange
   * @description Maneja cambios en los criterios de filtrado.
   * Reinicia la paginación y aplica los nuevos filtros.
   * @returns {void}
   */
  onFilterChange(): void {
    this.page = 1;
    this.applyFilters();
  }

  /**
   * @method onSubmit
   * @description Maneja el envío del formulario de filtros.
   * Previene el comportamiento por defecto y aplica filtros.
   * @param {Event} event - Evento de envío del formulario
   * @returns {void}
   */
  onSubmit(event: Event): void {
    event.preventDefault();
    this.page = 1;
    this.applyFilters();
  }

  // === Métodos de navegación y paginación ===

  /**
   * @method goToPage
   * @description Navega a una página específica si está dentro del rango válido.
   * Automáticamente desplaza la vista al inicio de la página.
   * @param {number} page - Número de página destino
   * @returns {void}
   */
  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.paginate();
      // Desplazar al inicio de la página para mejor experiencia de usuario
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * @method nextPage
   * @description Avanza a la siguiente página si existe.
   * Automáticamente desplaza la vista al inicio de la página.
   * @returns {void}
   */
  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.paginate();
      // Desplazar al inicio de la página para mejor experiencia de usuario
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  /**
   * @method prevPage
   * @description Retrocede a la página anterior si existe.
   * Automáticamente desplaza la vista al inicio de la página.
   * @returns {void}
   */
  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.paginate();
      // Desplazar al inicio de la página para mejor experiencia de usuario
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // === Métodos de gestión del carrito ===

  /**
   * @method addToCart
   * @description Agrega un libro al carrito de compras y muestra confirmación.
   * @param {Book} book - Libro a agregar al carrito
   * @returns {void}
   */
  addToCart(book: Book): void {
    this.cartStore.addToCart(book);
    this.lastAddedBook = book;
    this.showConfirmation = true;
    setTimeout(() => this.showConfirmation = false, 2000); // Auto-cierre después de 2 segundos
  }

  // === Métodos de gestión de reseñas ===

  /**
   * @method loadReviews
   * @description Carga o alterna la visibilidad de reseñas para un libro específico.
   * Si las reseñas ya están cargadas, las oculta. Si no, las carga del servidor.
   * @param {number} bookId - ID del libro para cargar reseñas
   * @returns {void}
   */
  loadReviews(bookId: number): void {
    // Si las reseñas ya están cargadas, las ocultamos
    if (this.reviews[bookId]) {
      delete this.reviews[bookId];
      return;
    }

    this.loadingReviews[bookId] = true;
    if (!this.newReview[bookId]) {
      this.newReview[bookId] = { puntuacion: 0, comentario: '' };
    }
    this.bookService.getReviews(bookId).subscribe({
      next: (reviews) => {
        this.reviews[bookId] = reviews;
        this.loadingReviews[bookId] = false;
      },
      error: () => {
        this.reviews[bookId] = [];
        this.loadingReviews[bookId] = false;
      }
    });
  }

  /**
   * @method submitReview
   * @description Envía una nueva reseña para un libro específico.
   * Valida los datos antes del envío y actualiza la lista local.
   * @param {number} bookId - ID del libro para el cual enviar la reseña
   * @returns {void}
   */
  submitReview(bookId: number): void {
    const review = this.newReview[bookId];
    if (!review || !review.puntuacion || !review.comentario) return;

    this.submittingReview[bookId] = true;

    // Crear objeto de reseña completo con todos los campos requeridos
    const reviewData: Omit<Review, 'id'> = {
      bookId: bookId,
      puntuacion: review.puntuacion,
      comentario: review.comentario,
      fecha: new Date().toISOString().split('T')[0] // Fecha actual en formato YYYY-MM-DD
    };

    this.bookService.addReview(bookId, reviewData).subscribe({
      next: (created) => {
        if (!this.reviews[bookId]) this.reviews[bookId] = [];
        this.reviews[bookId].push(created);
        this.newReview[bookId] = { puntuacion: 0, comentario: '' };
        this.submittingReview[bookId] = false;
      },
      error: () => {
        this.submittingReview[bookId] = false;
      }
    });
  }

  // === Getters y propiedades computadas ===

  /**
   * @getter pages
   * @description Genera un array con los números de página para la navegación.
   * Utilizado en la plantilla para renderizar los botones de paginación.
   * @returns {number[]} Array de números de página
   */
  get pages(): number[] {
    return Array.from({length: Math.max(this.totalPages, 1)}, (_, i) => i + 1);
  }
}
