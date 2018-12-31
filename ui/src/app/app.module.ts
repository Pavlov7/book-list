import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import {
    ClarityModule,
    ClrCheckboxModule,
    ClrCommonFormsModule
} from "@clr/angular";
import { AppComponent } from "./app.component";
import { ROUTING } from "./app.routing";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { BooksComponent } from "./components/books/books.component";
import { ListComponent } from "./components/list/list.component";
import { ReviewsComponent } from "./components/reviews/reviews.component";
import { BookComponent } from "./components/book/book.component";
import { ReviewComponent } from "./components/review/review.component";
import { LoginComponent } from "./components/login/login.component";
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { UserService } from './services/user.service';
import { RegisterComponent } from './components/register/register.component';
import { ClrFormsModule } from "@clr/angular";
import { ClrFormsNextModule } from "@clr/angular";

@NgModule({
    declarations: [
        AppComponent,
        BooksComponent,
        BookComponent,
        ListComponent,
        ReviewsComponent,
        ReviewComponent,
        LoginComponent,
        RegisterComponent
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
    providers: [
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
