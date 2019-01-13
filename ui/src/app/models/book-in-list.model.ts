import { BookList } from '../constants';

export class BookInList {
    public id: number;
    public volumeId: string;
    public rating: number;
    public dateStartedReading: Date;
    public dateFinishedReading: Date;
    public isFavourite: boolean;
    public bookTitle: string;
    public bookList: BookList;
}