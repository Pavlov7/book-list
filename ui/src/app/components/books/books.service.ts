import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class BooksService {
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
    getBooks() {
        return this.http.get('http://localhost:8700/books/search?q="java"');
    }

    searchBooks(query) {
        return this.http.get(`http://localhost:8700/books/search?q=${query}`);
    }
}