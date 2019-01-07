import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpHandler } from "@angular/common/http";
import { Router } from "@angular/router";
import { IF_ACTIVE_ID } from "@clr/angular/utils/conditional/if-active.service";
import { FormGroup, FormBuilder } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
import { LoginToken } from '../../models/login-token.response.model';

@Component({
    styleUrls: ["./login.component.scss"],
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private authService: AuthenticationService, private router: Router) {}

    public ngOnInit(): void {
        this.initForm();
    }

    public initForm(): void {
        this.loginForm = new FormGroup({
            username: new FormControl('', Validators.required),
            password: new FormControl('', Validators.required),
        })
    }

    // TODO add error messages
    public onSubmit() {
        let user: User = new User();
        Object.assign(user, this.loginForm.value);
        this.authService.login(user)
        .subscribe((res: LoginToken) => {
            console.log(res);
            location.reload(true);
            //this.router.navigate(['/']);
        },
        (error: any) => {
            console.error(error);
        });
    }
}
