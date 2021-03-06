import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BooksComponent } from './components/books/books.component';
import { ListComponent } from './components/list/list.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookService } from './services/book.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { BookComponent } from './components/book/book.component';
import { BookReviewsComponent } from './components/book-reviews/book-reviews.component';
import { ReviewService } from './services/review.service';
import { CommentService } from './services/comment.service';
import { ReviewCommentsComponent } from './components/review-comments/review-comments.component';
import { AlertService } from './services/alert.service';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    BookComponent,
    BookReviewsComponent,
    ReviewCommentsComponent,
    ListComponent,
    ReviewsComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    BookService,
    ReviewService,
    CommentService,
    AuthenticationService,
    AlertService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
