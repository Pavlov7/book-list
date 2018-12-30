import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HttpClientModule } from '@angular/common/http';

import { BooksComponent } from "./components/books/books.component";
import { ListComponent } from "./components/list/list.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";
import { BookComponent } from "./components/book/book.component";
import { ReviewComponent } from "./components/review/review.component";

@NgModule({
    declarations: [
        AppComponent,
        BooksComponent,
        BookComponent,
        ListComponent,
        ReviewsComponent,
        ReviewComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        ClarityModule,
        ROUTING
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
