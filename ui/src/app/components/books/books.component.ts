import { Component } from '@angular/core';
import { BaseResourceList } from '../shared/base.resource.list';
import { OnInit } from '@angular/core';
import { Params, ParamMap, ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BooksApiResponse } from '../../models/books-api-response.model';
import { constants } from '../../constants';

@Component({
    styleUrls: ['./books.component.scss'],
    templateUrl: './books.component.html'
})
export class BooksComponent extends BaseResourceList implements OnInit {

    constructor(private router: Router, private activatedRoute: ActivatedRoute, private bookService: BookService) {
        super(bookService);
    }

    private details(bookId:number): void {
        // console.log(bookId);
        this.router.navigate(['/book/', bookId]);
    }

    public ngOnInit(): void {
        this.activatedRoute.paramMap
            .subscribe((p: ParamMap) => {
                let query = p.get("q");

                if (!query) query = constants.DEFAULT_BOOKS_QUERY;
                this.search(query)
                    .subscribe(
                        (res: BooksApiResponse) => {
                            this.items = res.items;
                            this.totalCount = res.totalItems;
                            this.loading = false;
                        },
                        (error: any) => {
                            // TODO handle error alerts
                            console.error(error);
                        });
            });
    }
}
