import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { constants, ListType } from '../constants';
import { BookInList } from '../models/book-in-list.model';
import { BookInListApiRequest } from '../models/book-in-list-api-request.model';

@Injectable()
export class BookService {

  constructor(private http: HttpClient) {}

  public search(query: string): Observable<any> {
    return this.http.get(constants.BACKEND_URL + `/books/search?q=${query}`);
  }

  //TODO implement
  public getPage(number: number): Observable<any> {
    return this.http.get(constants.BACKEND_URL + '/books/search?q="java"');
  }

  // TODO implement top and skip for pagination
  public getBooksFromList(listType: ListType, page: number) {
    return this.http.get(constants.BACKEND_URL + '/lists/' + listType);
  }

  public getVolumeById(volumeId: string): Observable<any> {
    return this.http.get(constants.BACKEND_URL + '/books/volumes/' + volumeId);
  }


  public deleteBookFromList(book: BookInList, listname: ListType): Observable<any> {
    return this.http.post(constants.BACKEND_URL + '/books/deleteFromList/' + listname, book);
  }
  public addBookToList(bookRequest: BookInListApiRequest): Observable<any> {
    return this.http.post(constants.BACKEND_URL + '/books/add', bookRequest);
  }
}