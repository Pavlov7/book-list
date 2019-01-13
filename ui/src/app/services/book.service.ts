import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { constants, ListType } from '../constants';
import { BookInList } from '../models/book-in-list.model';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) { }

  public search(query: string, startIndex: number): Observable<any> {
    const params = {
      'q': query
    };
    if (startIndex) {
      params['startIndex'] = startIndex.toString();
    }
    return this.http.get(constants.BACKEND_URL + '/books/search', { params });
  }

  public getPage(number: number): Observable<any> {
    return this.http.get(constants.BACKEND_URL + '/books/search?q="java"');
  }

  public getBooksFromList(listType: ListType) {
    return this.http.get(constants.BACKEND_URL + '/lists/' + listType);
  }

  public getVolumeById(volumeId: string): Observable<any> {
    return this.http.get(constants.BACKEND_URL + '/books/volumes/' + volumeId);
  }

  public deleteBook(book: BookInList): Observable<any> {
    return this.http.post(constants.BACKEND_URL + '/books/delete', book);
  }

  public addBookToList(book: BookInList): Observable<any> {
    return this.http.post(constants.BACKEND_URL + '/books/add', book);
  }

  public getBookByVolumeId(volumeId: string) {
    return this.http.get(constants.BACKEND_URL + '/books/getByVolumeId/' + volumeId);
  }
}