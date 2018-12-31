import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class ReviewsService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
    getReviews() {
        return this.http.get(environment.serverUrl + '/reviews/get');
    }

    searchReviews(query) {
        return this.http.get(environment.serverUrl + `/reviews/get`);
    }
}