import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { ListComponent } from './components/list/list.component';
import { BooksComponent } from './components/books/books.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ReadersComponent } from './components/readers/readers.component';
import { BookComponent } from './components/book/book.component';

const routes: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'book/:volumeId', component: BookComponent },
  { path: 'books/search/:q', component: BooksComponent },
  { path: 'list/read', component: ListComponent },
  { path: 'list/favourites', component: ListComponent },
  { path: 'list/wishToRead', component: ListComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'readers', component: ReadersComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
