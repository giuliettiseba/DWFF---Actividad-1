import {Injectable} from '@angular/core';
import {Book} from './book.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BookSearchService {
  private apiUrl = 'https://mock.apidog.com/m1/1069422-1057565-default/Books';

  constructor(private http: HttpClient) {
  }

  getAllBooks(category?: string): Observable<Book[]> {
    let url = this.apiUrl;
    if (category) {
      url += `?category=${encodeURIComponent(category)}`;
    }
    return this.http.get<any>(url).pipe(
      map(response => {
        if (Array.isArray(response)) {
          return response;
        } else if (response.books) {
          return response.books;
        } else if (Array.isArray(response.data)) {
          return response.data;
        } else {
          return [];
        }
      })
    );
  }
}
