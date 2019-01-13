import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Volume } from '../../models/volume.model';
import { ListType } from '../../constants';
import { BookInListApiRequest } from '../../models/book-in-list-api-request.model';
import { BookInList } from '../../models/book-in-list.model';

@Component({
    styleUrls: ['./book.component.scss'],
    templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {

    public volume: Volume;
    public loading: boolean = true;

    constructor(private activatedRoute: ActivatedRoute,
        private bookService: BookService,
        private alertService: AlertService) { }

    private getByVolumeId(volumeId: string): Observable<any> {
        return this.bookService.getVolumeById(volumeId);
    }

    public ngOnInit(): void {
        this.activatedRoute.paramMap
            .subscribe((p: ParamMap) => {
                let volumeId = p.get("volumeId");
                if (volumeId) {
                    this.getByVolumeId(volumeId)
                        .subscribe(
                            (res: Volume) => {
                                this.volume = res;
                                this.loading = false;
                            },
                            (error: any) => {
                                this.loading = false;
                                this.alertService.showAlert(error);
                            });
                } else {
                    this.loading = false;
                }
            });
    }
    public addToList(listname: ListType) {
        const bookRequest: BookInListApiRequest = new BookInListApiRequest();
        bookRequest.volumeId = this.volume.id;
        switch (listname) {
            case ListType.ALREADY_READ:
                bookRequest.alreadyRead = true;
                break;
            case ListType.WISH_TO_READ:

        console.log(listname);
        console.log("hi");
                bookRequest.wishToRead = true;
                break;
            case ListType.FAVOURTIES:
                bookRequest.isFavourite = true;
                break;
            default:
                return;
        }
        this.bookService.addBookToList(bookRequest)
            .subscribe(
                (res: BookInList) => {
                    console.log(res);
                    //this.totalCount = res.totalItems;
                    //this.loading = false;
                }, (error: any) => {
                    this.loading = false;
                    this.alertService.showAlert(error);
                });
    }
}
