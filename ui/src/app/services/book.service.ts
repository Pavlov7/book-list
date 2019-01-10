import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResourceService } from '../components/shared/base.resource.service';
import { Observable } from 'rxjs';
import { constants, ListType } from '../constants';

@Injectable()
export class BookService implements BaseResourceService {

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
  
}