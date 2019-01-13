import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert.service';
import { Volume } from '../../models/volume.model';
import { ListType, BookList } from '../../constants';
import { BookInList } from '../../models/book-in-list.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
    styleUrls: ['./book.component.scss'],
    templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {

    public volume: Volume;
    public ratingMean: number = 0;
    public bookInList: BookInList;
    public loading: boolean = true;
    public BookList = BookList;

    constructor(private activatedRoute: ActivatedRoute,
        private bookService: BookService,
        private alertService: AlertService,
        public authService: AuthenticationService) { }

    public setRatingMean(mean: number):void {
        this.ratingMean = mean;
    }

    public loadBook(): void {
        if (!this.authService.currentUserValue) {
            return;
        }

        this.bookService.getBookByVolumeId(this.volume.id)
        .subscribe(
            (res: BookInList) => {
                this.bookInList = res;
            },
            (error: any) => {
                this.alertService.showAlert(error);
            });
    }

    public ngOnInit(): void {
        this.activatedRoute.paramMap
            .subscribe((p: ParamMap) => {
                let volumeId = p.get("volumeId");
                if (volumeId) {
                    this.bookService.getVolumeById(volumeId)
                        .subscribe(
                            (res: Volume) => {
                                this.volume = res;
                                this.loadBook();
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

    public deleteBook() {
        this.bookService.deleteBook(this.bookInList)
            .subscribe(
                (res: BookInList) => {
                    this.bookInList = res;
                    console.log(res);
                }, (error: any) => {
                    this.alertService.showAlert(error);
                });
    }
    // public addToList(listname: ListType) {
    //     const bookRequest: BookInListApiRequest = new BookInListApiRequest();
    //     bookRequest.volumeId = this.volume.id;
    //     switch (listname) {
    //         case ListType.ALREADY_READ:
    //             bookRequest.alreadyRead = true;
    //             break;
    //         case ListType.WISH_TO_READ:
    //             bookRequest.wishToRead = true;
    //             break;
    //         case ListType.FAVOURTIES:
    //             bookRequest.isFavourite = true;
    //             break;
    //         default:
    //             return;
    //     }
    //     this.bookService.addBookToList(bookRequest)
    //         .subscribe(
    //             (res: BookInList) => {
    //                 // show success
    //                 console.log(res);
    //                 this.bookInList = res;
    //             }, (error: any) => {
    //                 this.alertService.showAlert(error);
    //             });
    // }
}
