import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { environment } from "environments/environment";
import * as moment from "moment";
import {LOCAL_STORAGE_TOKEN_LABEL, LOCAL_STORAGE_TOKEN_EXPIRES_LABEL } from '../../constants';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Injectable()
export class RegisterService {
    constructor(private http: HttpClient) {}

    register(username: string, password: string) {
        return this.http
            .post(environment.serverUrl + "/auth/register/", { username, password })
    }
}
