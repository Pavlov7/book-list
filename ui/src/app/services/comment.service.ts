import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseResourceService } from '../components/shared/base.resource.service';
import { Observable } from 'rxjs';
import { constants, ListType } from '../constants';

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) {}

  // TODO implement for reviews
  public search(query: string): Observable<any> {
    return this.http.get(constants.BACKEND_URL + `/books/search?q=${query}`);
  }

  //TODO implement
  public getPage(number: number): Observable<any> {
    return this.http.get(constants.BACKEND_URL + '/books/search?q="java"');
  }

  public getCommentsByReviewId(reviewId: number): Observable<any> {
    return this.http.get(constants.BACKEND_URL + '/comments/get?reviewId=' + reviewId);
  }
  
}