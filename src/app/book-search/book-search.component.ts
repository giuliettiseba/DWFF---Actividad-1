import { Component, OnInit } from '@angular/core';
import { Book } from './book.model';
import { BookSearchService } from './book-search.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-search',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
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

  constructor(private bookService: BookSearchService) {}

  ngOnInit(): void {
    this.bookService.getAllBooks().subscribe((books) => {
      this.allBooks = books;
      this.applyFilters();
    });
  }

  applyFilters(): void {
    this.filteredBooks = this.allBooks.filter(book => {
      const matchesTitle = this.filters.title ? book.titulo.toLowerCase().includes(this.filters.title.toLowerCase()) : true;
      const matchesAuthor = this.filters.author ? book.autor.toLowerCase().includes(this.filters.author.toLowerCase()) : true;
      const matchesYear = this.filters.year ? String(book['año ']).includes(this.filters.year) : true;
      const matchesCategory = this.filters.category ? book.categoria === this.filters.category : true;
      return matchesTitle && matchesAuthor && matchesYear && matchesCategory;
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

  get pages(): number[] {
    return Array.from({ length: Math.max(this.totalPages, 1) }, (_, i) => i + 1);
  }
}
