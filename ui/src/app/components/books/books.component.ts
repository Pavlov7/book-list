import { Component } from '@angular/core';
import { BaseResourceList } from '../shared/base.resource.list';
import { OnInit } from '@angular/core';
import { Params, ParamMap, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BookApiResponse } from '../../models/book-api-response.model';

@Component({
    styleUrls: ['./books.component.scss'],
    templateUrl: './books.component.html'
})
export class BooksComponent extends BaseResourceList implements OnInit {

    constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) {
        super(bookService);
    }

    public ngOnInit(): void {
        this.activatedRoute.paramMap
            .subscribe((p: ParamMap) => {
                let query = p.get("q");
                if (query) {
                    this.search(query)
                        .subscribe(
                            (res: BookApiResponse) => {
                                this.items = res.items;
                                this.totalCount = res.totalItems;
                                this.loading = false;
                            },
                            (error: any) => {
                                // TODO handle error alerts
                                console.error(error);
                            });
                } else {
                    this.loading = false;
                }
            });
    }
}
