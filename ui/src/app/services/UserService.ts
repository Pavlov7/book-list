import {
    LOCAL_STORAGE_TOKEN_LABEL,
    LOCAL_STORAGE_TOKEN_EXPIRES_LABEL
} from "../constants";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "environments/environment";

@Injectable()
export class UserService {
    token: String = null;
    username: String = null;
    constructor(private http: HttpClient) {
        this.reloadToken();
    }

    reloadToken() {
        this.token = localStorage.getItem(LOCAL_STORAGE_TOKEN_LABEL);
        // TODO: api call get user data
        if (this.token) {
            this.username = "tmp";
            this.http
                .get(environment.serverUrl + "/users/me/")
                .subscribe(
                    resp => this.username = resp["username"],
                    err => console.log(err),
                    () => null
                );
        }
    }

    logout() {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_LABEL);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_EXPIRES_LABEL);
        this.token = null;
        this.username = null;
    }
}