import { Component } from '@angular/core';
import { BaseResourceList } from '../shared/base.resource.list';
import { OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BooksApiResponse } from '../../models/books-api-response.model';
import { constants } from '../../constants';
import { AlertService } from '../../services/alert.service';

@Component({
    styleUrls: ['./books.component.scss'],
    templateUrl: './books.component.html'
})
export class BooksComponent extends BaseResourceList implements OnInit {

    private index: number = 0;
    private query: string = constants.DEFAULT_BOOKS_QUERY;

    constructor(private router: Router,
        private activatedRoute: ActivatedRoute,
        private bookService: BookService,
        private alertService: AlertService) {
        super();
    }

    private details(bookId: number): void {
        this.router.navigate(['/book/', bookId]);
    }

    public ngOnInit(): void {
        this.activatedRoute.paramMap
            .subscribe((p: ParamMap) => {
                let query = p.get("q");
                this.index = 0;
                if (query) this.query = query;
                this.bookService.search(this.query, undefined)
                    .subscribe(
                        (res: BooksApiResponse) => {
                            this.items = res.items;
                            this.loading = false;
                        },  (error: any) => {
                            this.loading = false;
                            this.alertService.showAlert(error);
                        });
            });
    }

    public nextPage(): void {
        this.index += 10;
        this.bookService.search(this.query, this.index)
        .subscribe(
            (res: BooksApiResponse) => {
                this.items = this.items.concat(res.items);
            },  (error: any) => {
                this.alertService.showAlert(error);
            });;
    }
}
