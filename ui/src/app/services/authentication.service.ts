import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { constants } from '../constants';
import { mergeMap, map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { LoginToken } from '../models/login-token.response.model';

@Injectable()
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem(constants.LOCAL_STORAGE_TOKEN_LABEL)));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(user: User) {
    return this.http.post(constants.BACKEND_URL + '/auth/login', user)
      .pipe(map((res: LoginToken) => {
        user.token = res.accessToken;
        delete user.password;
        localStorage.setItem(constants.LOCAL_STORAGE_TOKEN_LABEL, JSON.stringify(user));
        this.currentUserSubject.next(user);
        return res;
      }));
  }

  public logout() {
    // remove user from local storage to log user out
    localStorage.removeItem(constants.LOCAL_STORAGE_TOKEN_LABEL);
    this.currentUserSubject.next(null);
  }
}