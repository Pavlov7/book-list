import { LOCAL_STORAGE_TOKEN_LABEL, LOCAL_STORAGE_TOKEN_EXPIRES_LABEL } from '../constants';
import { Injectable } from "@angular/core";

@Injectable()
export class UserService {
    token: String = null;
    username: String = null;
    constructor() {
        this.reloadToken();
    }

    reloadToken() {
        this.token = localStorage.getItem(LOCAL_STORAGE_TOKEN_LABEL);
        // TODO: api call get user data
        if (this.token) {
            this.username = "admin"
        }
    }

    logout() {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_LABEL);
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_EXPIRES_LABEL);
        this.token = null;
        this.username = null;
    }

}