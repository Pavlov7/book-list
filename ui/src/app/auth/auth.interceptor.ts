import { Observable } from 'rxjs';
import { LOCAL_STORAGE_TOKEN_LABEL } from '../constants';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const idToken = localStorage.getItem(LOCAL_STORAGE_TOKEN_LABEL);
        console.log(idToken);
        if (idToken) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + idToken)
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}
