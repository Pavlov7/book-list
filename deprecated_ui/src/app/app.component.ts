import { UserService } from './services/user.service';
import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent {
    searchQuery: String = null;
    constructor(private router: Router, private _user: UserService) {}

    logout() {
        this._user.logout();
    }
    onSearchInputChange(event) {
        this.searchQuery = event.target.value;
        this.router.navigate(["/books/search/" + this.searchQuery]);
    }
}
