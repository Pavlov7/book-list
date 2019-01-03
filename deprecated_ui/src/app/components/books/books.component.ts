import { Component } from "@angular/core";
import { HttpClient, HttpHeaders, HttpHandler } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { BooksService } from "./books.service";
import { ActivatedRoute } from '@angular/router';

const httpOptions = {
    headers: new HttpHeaders({ "Content-Type": "application/json" })
};

@Component({
    providers: [BooksService],
    styleUrls: ["./books.component.scss"],
    templateUrl: "./books.component.html"
})
export class BooksComponent {
    public books;

    query: String;
    private sub: any;

    constructor(private _booksService: BooksService, private route: ActivatedRoute) {}

    ngOnInit() {
        //this.loadBooks();
        this.sub = this.route.params.subscribe(params => {
            this.query = params["query"];
            this.loadBooks(this.query);
            // In a real app: dispatch action to load the details here.
        });
    }

    loadBooks(query: String = "java") {
        return this._booksService.searchBooks(query).subscribe(
            data => {
                this.books = data["items"];
            },
            err => console.log(err),
            () => console.log("done books loading")
        );
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}
