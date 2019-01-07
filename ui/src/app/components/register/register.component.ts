import { Component, OnInit } from "@angular/core";
import { HttpClient, HttpHeaders, HttpHandler } from "@angular/common/http";
import { Router } from "@angular/router";
import { IF_ACTIVE_ID } from "@clr/angular/utils/conditional/if-active.service";
import { FormGroup, FormBuilder, ValidatorFn } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
import { LoginToken } from '../../models/login-token.response.model';
import { AbstractControl } from '@angular/forms';

@Component({
    styleUrls: ["./register.component.scss"],
    templateUrl: "./register.component.html"
})
export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;

    constructor(private authService: AuthenticationService, private router: Router) { }

    public ngOnInit(): void {
        this.initForm();
    }

    public initForm(): void {
        this.registerForm = new FormGroup({
            username: new FormControl('', Validators.required),
            passwords: new FormGroup({
                password: new FormControl('', Validators.required),
                confirmPassword: new FormControl('', Validators.required)
            }, this.passwordConfirming),
        })
    }

    public passwordConfirming(c: AbstractControl): { [key: string]: any } {
        if (c.get('password').value !== c.get('confirmPassword').value) {
            return { invalid : true };
        }
    }

    // TODO add error messages
    public onSubmit() {
        let user: User = new User();
        user.username = this.registerForm.get('username').value;
        user.password = this.registerForm.get('passwords').get('password').value;
        this.authService.register(user)
            .subscribe((res: any) => {
                console.log(res);
                this.router.navigate(['/login']);
            },
            (error: any) => {
                console.error(error);
            });
    }
}
