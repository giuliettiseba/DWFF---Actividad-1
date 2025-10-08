import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BookSearchComponent} from './book-search.component';
import {BookSearchService} from './book-search.service';
import {CartStoreService} from '../cart/cart.store';
import {of} from 'rxjs';

describe('BookSearchComponent', () => {
  let component: BookSearchComponent;
  let fixture: ComponentFixture<BookSearchComponent>;
  let bookService: jasmine.SpyObj<BookSearchService>;
  let cartStore: CartStoreService;

  beforeEach(async () => {
    bookService = jasmine.createSpyObj('BookSearchService', ['getAllBooks']);
    await TestBed.configureTestingModule({
      imports: [BookSearchComponent],
      providers: [
        {provide: BookSearchService, useValue: bookService},
        CartStoreService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(BookSearchComponent);
    component = fixture.componentInstance;
    cartStore = TestBed.inject(CartStoreService);
    bookService.getAllBooks.and.returnValue(of([]));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter books', () => {
    component.allBooks = [
      {
        id: 1, titulo: 'A', autor: 'B', "año": 2020, categoria: 'C', imagen: '', sinopsis: '', precio: 110
      },
      {id: 2, titulo: 'X', autor: 'Y', "año": 2021, categoria: 'Z', imagen: '', sinopsis: '', precio: 12}
    ];
    component.filters.title = 'A';
    component.applyFilters();
    expect(component.filteredBooks.length).toBe(1);
    expect(component.filteredBooks[0].titulo).toBe('A');
  });

  it('should add book to cart', () => {
    spyOn(cartStore, 'addToCart');
    const book = {id: 1, titulo: 'A', autor: 'B', "año": 2020, categoria: 'C', imagen: '', sinopsis: '', precio: 100};
    component.addToCart(book);
    expect(cartStore.addToCart).toHaveBeenCalledWith(book);
  });
});
