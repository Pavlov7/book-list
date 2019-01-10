import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Params, ParamMap, ActivatedRoute } from '@angular/router';
import { VolumeApiResponse } from '../../models/volume-api-response.model';
import { Observable } from 'rxjs';
import { ReviewService } from '../../services/review.service';
import { BaseResourceList } from '../shared/base.resource.list';
import { ReviewsApiResponse } from '../../models/reviews-api-response.model';
import { Review } from '../../models/review.model';

@Component({
    selector: 'book-reviews',
    styleUrls: ['./book-reviews.component.scss'],
    templateUrl: './book-reviews.component.html'
})
export class BookReviewsComponent extends BaseResourceList implements OnInit {

    @Input() volumeId:string;

    loading:boolean = true;
    notFound:boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private reviewService: ReviewService) {
        super(reviewService);
    }

    private getByVolumeId(volumeId: string): Observable<any> {
        return this.reviewService.getReviewsByVolumeId(volumeId);
    }
    

    public ngOnInit(): void {
        this.activatedRoute.paramMap
            .subscribe((p: ParamMap) => {
                let volumeId = this.volumeId;
                if (volumeId) {
                    this.getByVolumeId(volumeId)
                        .subscribe(
                            (res: Review[]) => {
                                // todo - move to reviews-api-response
                                this.items = res;
                                console.log(res);
                                // this.totalCount = res.totalItems;
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
