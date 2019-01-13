export class BookInListApiRequest {
    public volumeId: string;
    // public rating: number;
    // public dateStartedReading: Date;
    // public dateFinishedReading: Date;
    public alreadyRead: boolean;
    public isFavourite: boolean;
    public wishToRead: boolean;

    constructor() {
        this.alreadyRead = false;
        this.isFavourite = false;
        this.wishToRead = false;
    }
}