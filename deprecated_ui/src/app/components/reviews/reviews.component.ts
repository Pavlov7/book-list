import { Component } from "@angular/core";
import { HttpClient, HttpHeaders, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { ReviewsService } from "./reviews.service";
import { ActivatedRoute } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Component({
    providers: [ReviewsService],
    styleUrls: ["./reviews.component.scss"],
    templateUrl: "./reviews.component.html"
})
export class ReviewsComponent {
    public reviews;

    query: String;
    private sub: any;

    constructor(private _reviewsService: ReviewsService, private route: ActivatedRoute) {}

    ngOnInit() {
        //this.loadReviews();
        this.sub = this.route.params.subscribe(params => {
            this.query = params["query"];
            this.loadReviews(this.query);
            // In a real app: dispatch action to load the details here.
        });
    }

    loadReviews(query: String = "java") {
        return this._reviewsService.getReviews().subscribe(
            data => {
                this.reviews = data;
                console.log(this.reviews[0]);
            },
            err => console.log(err),
            () => console.log("done reviews loading")
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
