import { Component } from "@angular/core";
import { HttpClient, HttpHeaders, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login.service";
import { ActivatedRoute } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Component({
    providers: [LoginService],
    styleUrls: ["./login.component.scss"],
    templateUrl: "./login.component.html"
})
export class LoginComponent {
    private user: object;
    private sub: any;

    constructor(private _loginService: LoginService, private route: ActivatedRoute) {}

    login() {
        return this._loginService.login("test", "test").subscribe(
            data => {
                this.user = data;
            },
            err => console.log(err),
            () => console.log("done login loading")
        );
    }
}
