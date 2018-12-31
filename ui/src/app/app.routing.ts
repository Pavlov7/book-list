/*
 * Copyright (c) 2016 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';
import { BooksComponent } from './components/books/books.component';
import { ListComponent } from './components/list/list.component';
import { ReviewsComponent } from './components/reviews/reviews.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'books', pathMatch: 'full'},
    {path: 'books', component: BooksComponent},
    {path: 'books/search/:query', component: BooksComponent},
    {path: 'list', component: ListComponent},
    {path: 'reviews', component: ReviewsComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
