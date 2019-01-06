import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavigationStart } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public query: string;
  public showMenu: boolean = true;
  public currentUser: User;

  constructor(private router: Router, private authService: AuthenticationService) {
    this.router.events.subscribe(event => {

      if (event instanceof NavigationStart) {
        // don't show menus on login page
        this.showMenu = !event.url.includes('/login');
      }
    });

    this.authService.currentUser.subscribe((user: User) => this.currentUser = user);
  }

  public search(): void {
    this.router.navigate(['/books/search', this.query]);
  }

  public logout() {
    this.authService.logout();
    location.reload(true);
  }
}
