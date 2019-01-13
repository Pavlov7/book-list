import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ListComponent } from './components/list/list.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'book/:volumeId', component: BookComponent },
  { path: 'books/search/:q', component: BooksComponent },
  { path: 'list/read', component: ListComponent },
  { path: 'list/currentlyReading', component: ListComponent },
  { path: 'list/wishToRead', component: ListComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
