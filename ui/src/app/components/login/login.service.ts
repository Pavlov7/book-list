import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
 
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
 
@Injectable()
export class LoginService {
    private form = {
        password: "some",
        username: "username"
    }
 
    constructor(private http:HttpClient) {}
 
    // Uses http.get() to load data from a single API endpoint
    login(username, password) {
        return this.http.get('http://localhost:8700/auth/search?q="java"');
    }
}