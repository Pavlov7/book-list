import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "../../../environments/environment";
import * as moment from "moment";
import {LOCAL_STORAGE_TOKEN_LABEL, LOCAL_STORAGE_TOKEN_EXPIRES_LABEL } from '../../constants';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class LoginService {
    constructor(private http: HttpClient) {}

    login(username: string, password: string) {
        return this.http
            .post(environment.serverUrl + "/auth/sign-in/", { username, password })
            .subscribe(
                res => this.setSession(res),
                err => console.log(err),
                () => console.log("done login loading")
            );
    }

    private setSession(authResult) {
        // TODO: implement on server side
        const expiresAt = moment().add(authResult.expiresIn, "second");
        localStorage.setItem(LOCAL_STORAGE_TOKEN_LABEL, authResult.accessToken);
        localStorage.setItem(LOCAL_STORAGE_TOKEN_EXPIRES_LABEL, JSON.stringify(expiresAt.valueOf()));
    }

    logout() {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_LABEL);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_EXPIRES_LABEL);
    }

    public isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }

    getExpiration() {
        const expiration = localStorage.getItem(LOCAL_STORAGE_TOKEN_EXPIRES_LABEL);
        const expiresAt = JSON.parse(expiration);
        return moment(expiresAt);
    }
}
