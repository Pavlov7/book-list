import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ClarityModule, ClrCheckboxModule, ClrCommonFormsModule } from '@clr/angular';
import { AppComponent } from './app.component';
import { ROUTING } from "./app.routing";
import { HttpClientModule } from '@angular/common/http';

import { BooksComponent } from "./components/books/books.component";
import { ListComponent } from "./components/list/list.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";
import { BookComponent } from "./components/book/book.component";
import { ReviewComponent } from "./components/review/review.component";
import { LoginComponent } from './components/login/login.component';
import { ClrFormsModule } from '@clr/angular';
import { ClrFormsNextModule } from '@clr/angular';

@NgModule({
    declarations: [
        AppComponent,
        BooksComponent,
        BookComponent,
        ListComponent,
        ReviewsComponent,
        ReviewComponent,
        LoginComponent
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        FormsModule,
        HttpModule,
        HttpClientModule,
        ClarityModule,
        ClrFormsNextModule,
        ClrFormsModule,
        ClrCheckboxModule,
        ClrCommonFormsModule,
        ROUTING
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {

}
