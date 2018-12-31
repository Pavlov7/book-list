import { Component } from "@angular/core";
import { HttpClient, HttpHeaders, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { RegisterService } from "./register.service";
import { Router } from "@angular/router";
import { UserService } from "../../services/UserService";

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Component({
    providers: [RegisterService],
    styleUrls: ["./register.component.scss"],
    templateUrl: "./register.component.html"
})
export class RegisterComponent {
    private isLoggedIn: Boolean = false;
    private error: String = null;
    private form = {
        password: "",
        username: ""
    };

    constructor(
        private _registerService: RegisterService,
        private _user: UserService,
        private router: Router
    ) {
        if (_user.token) {
            this.isLoggedIn = true;
        }
    }

    register() {
        // console.log("register using", this.form.username, this.form.password);
        return this._registerService
            .register(this.form.username, this.form.password)
            .subscribe(
                res => this.router.navigate(["/login"]),
                err => {
                    this.error = err.error.message;
                    console.log(err);
                },
                () => console.log("done register")
            );
    }
}
