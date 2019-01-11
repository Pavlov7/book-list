import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { VolumeApiResponse } from '../../models/volume-api-response.model';
import { Observable } from 'rxjs';
import { AlertService } from '../../services/alert.service';

@Component({
    styleUrls: ['./book.component.scss'],
    templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {

    public volume: VolumeApiResponse = null;
    public loading: boolean = true;
    public notFound: boolean = false;

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
                            (res: VolumeApiResponse) => {
                                this.volume = res;
                                this.loading = false;
                            },
                            (error: any) => {
                                this.loading = false;
                                this.notFound = true;
                                this.alertService.showAlert(error);
                            });
                } else {
                    this.loading = false;
                }
            });
    }
}
