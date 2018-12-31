import { Component } from "@angular/core";
import { HttpClient, HttpHeaders, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginService } from "./login.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/UserService";

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Component({
    providers: [LoginService],
    styleUrls: ["./login.component.scss"],
    templateUrl: "./login.component.html"
})
export class LoginComponent {
    private isLoggedIn: Boolean = false;
    private form = {
        password: "",
        username: ""
    };

    constructor(
        private _loginService: LoginService,
        private _user: UserService,
        private router: Router
    ) {
        if (_user.token) {
            this.isLoggedIn = true;
        }
    }

    ngOnInit() {
        console.log(this.isLoggedIn);
    }

    login() {
        // console.log("login using", this.form.username, this.form.password);
        return this._loginService.login(this.form.username, this.form.password).add(() => {
            this._user.reloadToken();
            this.router.navigate(["/books/"]);
        });
    }
}
