import { Component, Input } from "@angular/core";

@Component({
    selector: "review-list-item",
    styleUrls: ["./review.component.scss"],
    templateUrl: "./review.component.html"
})
export class ReviewComponent {
    @Input()
    review: Object;

    ngOnInit() {
    }
}
