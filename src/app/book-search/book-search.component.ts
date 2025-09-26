import {Component, OnInit} from '@angular/core';
import {Book} from './book.model';
import {BookSearchService} from './book-search.service';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CartStoreService} from '../cart/cart.store';
import {Review} from './review.model';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})

export class BookSearchComponent implements OnInit {
  allBooks: Book[] = [];
  filteredBooks: Book[] = [];
  books: Book[] = [];
  filters = {
    title: '',
    author: '',
    year: '',
    category: ''
  };
  page = 1;
  limit = 6;
  total = 0;
  totalPages = 1;
  showConfirmation = false;
  lastAddedBook: Book | null = null;

  // Reseñas
  reviews: { [bookId: number]: Review[] } = {};
  newReview: { [bookId: number]: { puntuacion: number; comentario: string } } = {};
  loadingReviews: { [bookId: number]: boolean } = {};
  submittingReview: { [bookId: number]: boolean } = {};

  constructor(private bookService: BookSearchService, public cartStore: CartStoreService) {
  }

  ngOnInit(): void {
    this.fetchBooks();
  }

  fetchBooks(): void {
    const category = this.filters.category || undefined;
    this.bookService.getAllBooks(category).subscribe((books) => {
      this.allBooks = books;
      this.applyFilters(true);
    });
  }

  applyFilters(fromApi = false): void {
    if (!fromApi) {
      this.fetchBooks();
      return;
    }
    this.filteredBooks = this.allBooks.filter(book => {
      const matchesTitle = this.filters.title ? book.titulo.toLowerCase().includes(this.filters.title.toLowerCase()) : true;
      const matchesAuthor = this.filters.author ? book.autor.toLowerCase().includes(this.filters.author.toLowerCase()) : true;
      const matchesYear = this.filters.year ? String(book['año']).includes(this.filters.year) : true;
      return matchesTitle && matchesAuthor && matchesYear;
    });
    this.total = this.filteredBooks.length;
    this.totalPages = Math.max(1, Math.ceil(this.total / this.limit));
    this.page = Math.min(this.page, this.totalPages);
    this.paginate();
  }

  paginate(): void {
    const start = (this.page - 1) * this.limit;
    const end = start + this.limit;
    this.books = this.filteredBooks.slice(start, end);
  }

  onFilterChange(): void {
    this.page = 1;
    this.applyFilters();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    this.page = 1;
    this.applyFilters();
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.page = page;
      this.paginate();
    }
  }

  nextPage(): void {
    if (this.page < this.totalPages) {
      this.page++;
      this.paginate();
    }
  }

  prevPage(): void {
    if (this.page > 1) {
      this.page--;
      this.paginate();
    }
  }

  addToCart(book: Book): void {
    this.cartStore.addToCart(book);
    this.lastAddedBook = book;
    this.showConfirmation = true;
    setTimeout(() => this.showConfirmation = false, 2000); // Auto-close after 2s
  }

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

  submitReview(bookId: number): void {
    const review = this.newReview[bookId];
    if (!review || !review.puntuacion || !review.comentario) return;
    this.submittingReview[bookId] = true;
    this.bookService.addReview(bookId, review).subscribe({
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

  get pages(): number[] {
    return Array.from({length: Math.max(this.totalPages, 1)}, (_, i) => i + 1);
  }
}
