import { Component, OnInit } from "@angular/core";
import { BookInList } from '../../models/book-in-list.model';
import { ListType } from '../../constants';
import { Router } from '@angular/router';
import { BookService } from '../../services/book.service';
import { BaseResourceList } from '../shared/base.resource.list';
import { AlertService } from '../../services/alert.service';
import { Volume } from '../../models/volume.model';

@Component({
    styleUrls: ['./list.component.scss'],
    templateUrl: './list.component.html',
})
export class ListComponent extends BaseResourceList implements OnInit {

    public listType: ListType;

    constructor(private router: Router,
        private bookService: BookService,
        private alertService: AlertService) {
        super();
        let lastSegment = router.url.substring(router.url.lastIndexOf('/') + 1, router.url.length);
        switch (lastSegment) {
            case 'read':
                this.listType = ListType.ALREADY_READ;
                break;
            case 'currentlyReading':
                this.listType = ListType.CURRENTLY_READING;
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
                    //this.loadVolumes();
                    this.loading = false;
                }, (error: any) => {
                    this.loading = false;
                    this.alertService.showAlert(error);
                });
    }

    private loadVolumes(): void {
        this.items.forEach((item: BookInList) => {
            this.bookService.getVolumeById(item.volumeId)
                .subscribe(
                    (res: Volume) => {
                        //this.volumes.push(res);
                    },
                    (error: any) => {
                        this.alertService.showAlert(error);
                    });
        });
    }


    public details(volumeId: string): void {
        this.router.navigate(['/book/', volumeId]);
    }

    public onEdit(book: BookInList) {
        // TODO: edit mode
    }

    public onDelete(book: BookInList) {
        this.bookService.deleteBook(book)
            .subscribe(
                (res: BookInList) => {
                    this.items = this.items.filter((item: BookInList) => item.id != res.id);
                }, (error: any) => {
                    this.loading = false;
                    this.alertService.showAlert(error);
                });
    }
}
