import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { constants, ListType } from '../constants';

@Injectable()
export class CommentService {
  constructor(private http: HttpClient) {}

  public getCommentsByReviewId(reviewId: number): Observable<any> {
    return this.http.get(constants.BACKEND_URL + '/comments/get?reviewId=' + reviewId);
  }
}