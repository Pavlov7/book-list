import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public query: string;

  constructor(private router: Router) {}

  public search(): void {
    this.router.navigate(['/books/search', this.query]);
  }
}
