import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { constants, ListType } from '../constants';

@Injectable()
export class ReviewService {
  constructor(private http: HttpClient) {}

    public getReviewsByVolumeId(volumeId: string): Observable<any> {
    return this.http.get(constants.BACKEND_URL + '/reviews/get?volumeId=' + volumeId);
  }
}