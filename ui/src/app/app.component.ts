import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user.model';
import { AlertService } from './services/alert.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public query: string;
  public showMenu: boolean = true;
  public currentUser: User;
  public alertText: string;

  constructor(private router: Router,
    private authService: AuthenticationService,
    private alertService: AlertService) {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {
        // don't show menus on login page
        this.showMenu = !event.url.includes('/login') && !event.url.includes('/register');
      }
    });

    this.authService.currentUser.subscribe((user: User) => this.currentUser = user);
    this.alertService.alert.subscribe((alert: string) => this.alertText = alert);
  }

  public search(): void {
    this.router.navigate(['/books/search', this.query]);
  }

  public logout(): void {
    this.authService.logout();
    // might be better, will have to check if menu is reloaded
    location.reload(true);
    //this.router.navigate(['/']);
  }

  public closeAlert(): void {
    this.alertText = undefined;
  }
}
