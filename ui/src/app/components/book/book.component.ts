import { Component, Input } from "@angular/core";

@Component({
    selector: "book-list-item",
    styleUrls: ["./book.component.scss"],
    templateUrl: "./book.component.html"
})
export class BookComponent {
    @Input()
    book: Object;

    author: String = null;
    thumbnail: String = null;
    description: String = null;
    defaultThumbnail: String =
        "https://upload.wikimedia.org/wikipedia/commons/9/92/THE_BOOK_cover_image.png";
    ngOnInit() {
        let authors = this.book["volumeInfo"]["authors"];
        this.author = authors ? authors[0] : null;
        let imageLinks = this.book["volumeInfo"]["imageLinks"];
        this.thumbnail = imageLinks
            ? imageLinks.thumbnail
            : this.defaultThumbnail;
        let desc = this.book["volumeInfo"]["description"];
        this.description = desc || "No description provided";
        //console.log(this.book);
    }
}
