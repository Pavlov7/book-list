import { Component, OnInit } from "@angular/core";
import { BookInList } from '../../models/book-in-list.model';
import { ListType } from '../../constants';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';

@Component({
    styleUrls: ['./list.component.scss'],
    templateUrl: './list.component.html',
})
export class ListComponent implements OnInit {

    public items: BookInList[] = [];

    public listType: ListType;

    constructor(private router: Router, private bookService: BookService) {
        let lastSegment = router.url.substring(router.url.lastIndexOf('/') + 1, router.url.length);
        switch (lastSegment) {
            case 'read':
                this.listType = ListType.ALREADY_READ;
                break;
            case 'favourites':
                this.listType = ListType.FAVOURTIES;
                break;
            case 'wishToRead':
                this.listType = ListType.WISH_TO_READ;
                break;
            default:
                this.router.navigate['/'];
        }
    }

    public ngOnInit(): void {
        this.bookService.getBooksFromList(this.listType, 1)
            .subscribe(
                (res: BookInList[]) => {
                    this.items = res;
                    //this.totalCount = res.totalItems;
                    //this.loading = false;
                },
                (error: any) => {
                    // TODO handle error alerts
                    console.error(error);
                });
    }
}
