import { Component } from '@angular/core';
import { BaseResourceList } from '../shared/base.resource.list';
import { OnInit } from '@angular/core';
import { Params, ParamMap, ActivatedRoute } from '@angular/router';
import { BookService } from '../../services/book.service';
import { VolumeApiResponse } from '../../models/volume-api-response.model';
import { Observable } from 'rxjs';

@Component({
    styleUrls: ['./book.component.scss'],
    templateUrl: './book.component.html'
})
export class BookComponent implements OnInit {

    volume:VolumeApiResponse = null;
    loading:boolean = true;
    notFound:boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private bookService: BookService) {
        //super(bookService);
    }

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
                                // TODO handle error alerts
                                console.error(error);
                                this.loading = false;
                                this.notFound = true;
                            });
                } else {
                    this.loading = false;
                }
            });
    }
}
