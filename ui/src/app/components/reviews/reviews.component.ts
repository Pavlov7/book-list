import { Component, OnInit } from "@angular/core";
import { BaseResourceList } from '../shared/base.resource.list';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../models/review.model';
import { AlertService } from '../../services/alert.service';

@Component({
    selector: 'reviews',
    templateUrl: './reviews.component.html',
    styleUrls: ['./reviews.component.scss']
})
export class ReviewsComponent extends BaseResourceList implements OnInit {

    public myReviews: boolean = false;

    constructor(private reviewService: ReviewService,
                private alertService: AlertService) {
        super();
    }

    public ngOnInit(): void {
        this.loadReviews();
    }

    public loadReviews(): void {
        this.loading = true;
        this.reviewService.getReviews(this.myReviews)
        .subscribe((res: Review[]) => {
            this.items = res;
            this.loading = false;
        }, (error: any) => {
            this.loading = false;
            this.notFound = true;
            this.alertService.showAlert(error);
        });
    }

    public setShowMyReviews(value: boolean): void {
        this.myReviews = value;
        this.loadReviews();
    }
}