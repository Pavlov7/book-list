import { Component } from "@angular/core";
import { BookInList } from '../../models/book-in-list.model';

@Component({
    styleUrls: ['./list.component.scss'],
    templateUrl: './list.component.html',
})
export class ListComponent {
    public data: BookInList[] = [
        {
            id: 1,
            volumeId: "aaa",
            rating: 5,
            dateStartedReading: new Date("2019-05-11"),
            dateFinishedReading: new Date("2019-05-12"),
            alreadyRead: true,
            isFavourite: true,
            wishToRead: false
        },
        { id: 2,
            volumeId: "bbb",
            rating: 10,
            dateStartedReading: new Date("2019-01-11"),
            dateFinishedReading: new Date("2019-02-12"),
            alreadyRead: false,
            isFavourite: false,
            wishToRead: true},
        { id: 3,
            volumeId: "ccc",
            rating: 0,
            dateStartedReading: new Date("2019-5-11"),
            dateFinishedReading: new Date("2019-10-12"),
            alreadyRead: false,
            isFavourite: true,
            wishToRead: false}
    ]
}
