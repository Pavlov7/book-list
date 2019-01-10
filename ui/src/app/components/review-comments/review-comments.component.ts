import { Component, Input } from '@angular/core';
import { OnInit } from '@angular/core';
import { Params, ParamMap, ActivatedRoute } from '@angular/router';
import { VolumeApiResponse } from '../../models/volume-api-response.model';
import { Observable } from 'rxjs';
import { ReviewService } from '../../services/review.service';
import { BaseResourceList } from '../shared/base.resource.list';
import { ReviewsApiResponse } from '../../models/reviews-api-response.model';
import { Review } from '../../models/review.model';
import { CommentService } from '../../services/comment.service';

@Component({
    selector: 'review-comments',
    styleUrls: ['./review-comments.component.scss'],
    templateUrl: './review-comments.component.html'
})
export class ReviewCommentsComponent extends BaseResourceList implements OnInit {

    @Input() reviewId:number;

    loading:boolean = true;
    notFound:boolean = false;

    constructor(private activatedRoute: ActivatedRoute, private commentService: CommentService) {
        super(commentService);
    }

    private getByReviewId(reviewId: number): Observable<any> {
        return this.commentService.getCommentsByReviewId(reviewId);
    }
    

    public ngOnInit(): void {
        this.activatedRoute.paramMap
            .subscribe((p: ParamMap) => {
                let reviewId = this.reviewId;
                if (reviewId) {
                    this.getByReviewId(reviewId)
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
