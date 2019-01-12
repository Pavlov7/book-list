import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthenticationService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
import { LoginToken } from '../../models/login-token.response.model';
import { AlertService } from '../../services/alert.service';

@Component({
    styleUrls: ["./login.component.scss"],
    templateUrl: "./login.component.html"
})
export class LoginComponent implements OnInit {
    public loginForm: FormGroup;

    constructor(private authService: AuthenticationService,
        private router: Router,
        public alertService: AlertService) { }

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
                // location.reload(true);
                this.router.navigate(['/']);
                location.reload(true);
            },
                (error: any) => {
                    this.alertService.showAlert(error);
                });
    }
}
