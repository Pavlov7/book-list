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
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';

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
    public modalOpened: boolean = false;
    public _rating: number[] = Array(11).fill(0).map((x, i) => i);
    public addBookToListForm: FormGroup;
    public lists: string[] = [ListName.CURRENTLY_READING, ListName.ALREADY_READ, ListName.WISH_TO_READ];
    public baseForm: boolean = true;
    public list: string;

    constructor(private activatedRoute: ActivatedRoute,
        private bookService: BookService,
        private alertService: AlertService,
        public authService: AuthenticationService) {
        this.bookInList = new BookInList();
        this.initBaseForm();
        this.list = ListName.CURRENTLY_READING;
    }

    private initFullForm(): void {
        this.initBaseForm();
        this.addBookToListForm.addControl('dateStartedReading', new FormControl());
        this.addBookToListForm.addControl('dateFinishedReading', new FormControl());
    }

    private initBaseForm(): void {
        this.addBookToListForm = new FormGroup({
            isFavourite: new FormControl(false),
            rating: new FormControl(),
        });
    }

    public openModal() {
        this.modalOpened = true;
        if (this.bookInList.volumeId) {
            this.setFormValue();
        }
    }

    public setRatingMean(mean: number): void {
        this.ratingMean = mean;
    }

    public loadBook(): void {
        if (!this.authService.currentUserValue) {
            return;
        }

        this.bookService.getBookByVolumeId(this.volume.id)
            .subscribe(
                (res: BookInList) => {
                    if (res) {
                        this.bookInList = res;
                    }
                    if (this.bookInList.bookList != BookList.ALREADY_READ) {
                        this.initBaseForm();
                        this.baseForm = true;
                    } else {
                        this.initFullForm();
                        this.baseForm = false;
                    }
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
                    this.bookInList.volumeId = volumeId;
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
                    this.initFullForm();
                    this.list = ListName.ALREADY_READ;
                    this.ngOnInit();
                }, (error: any) => {
                    this.alertService.showAlert(error);
                });
    }

    public onListChange(list: any) {
        switch (list) {
            case ListName.CURRENTLY_READING:
            case ListName.WISH_TO_READ:
            default:
                this.initBaseForm();
                this.baseForm = true;
                break;
            case ListName.ALREADY_READ:
                this.initFullForm();
                this.baseForm = false;
                break;
        }

        this.list = list;

        this.addBookToListForm.reset();
        this.setFormValue();
    }

    private setFormValue(): void {
        this.addBookToListForm.patchValue({
            isFavourite: this.bookInList.isFavourite,
            rating: this.bookInList.rating
        });

        if (!this.baseForm) {
            this.addBookToListForm.patchValue({
                dateStartedReading: this.bookInList.dateStartedReading,
                dateFinishedReading: this.bookInList.dateFinishedReading
            });
        }
    }

    public addToList(): void {
        Object.assign(this.bookInList, this.addBookToListForm.value);
        switch (this.list) {
            case ListName.CURRENTLY_READING:
                this.bookInList.bookList = BookList.CURRENTLY_READING;
                break;
            case ListName.WISH_TO_READ:
                this.bookInList.bookList = BookList.WISH_TO_READ;
                break;
            case ListName.ALREADY_READ:
                this.bookInList.bookList = BookList.ALREADY_READ;
                break;
        }

        this.bookService.addBookToList(this.bookInList)
            .subscribe((res: any) => {
                this.initFullForm();
                this.list = ListName.ALREADY_READ;
                this.ngOnInit();
            }, (error: any) => {
                this.alertService.showAlert(error);
            });
        this.modalOpened = false;
    }
}

enum ListName {
    ALREADY_READ = 'Already Read',
    CURRENTLY_READING = 'Currently Reading',
    WISH_TO_READ = 'Wish to read'
}
