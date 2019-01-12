import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { BaseResourceList } from '../shared/base.resource.list';
import { AlertService } from '../../services/alert.service';
import { ReviewApiRequest } from '../../models/review-api-request.model';

@Component({
    selector: 'book-reviews',
    styleUrls: ['./book-reviews.component.scss'],
    templateUrl: './book-reviews.component.html'
})
export class BookReviewsComponent extends BaseResourceList implements OnInit {

    @Input() volumeId: string;

    public reviewReq: ReviewApiRequest;
    public _rating: number[] = Array(10).fill(0).map((x,i)=>i+1);
    public modalOpened: boolean = false;

    constructor(private activatedRoute: ActivatedRoute,
        private reviewService: ReviewService,
        private alertService: AlertService) {
        super();
    }

    private getByVolumeId(volumeId: string): Observable<any> {
        return this.reviewService.getReviewsByVolumeId(volumeId);
    }

    public ngOnInit(): void {
        this.reviewReq = new ReviewApiRequest(this.volumeId);
        this.reviewReq.rating = 0;
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
                            }, (error: any) => {
                                this.loading = false;
                                this.alertService.showAlert(error);
                            });
                } else {
                    this.loading = false;
                }
            });
    }

    private addReview():void {
        this.reviewService.addReview(this.reviewReq).subscribe(
            (res: Review) => {
                this.items.push(res);
                console.log(res);
                this.modalOpened = false;
            }, (error: any) => {
                this.alertService.showAlert(error);
                this.modalOpened = false;
            }
        )
    }
}
