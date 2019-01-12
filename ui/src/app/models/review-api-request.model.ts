export class ReviewApiRequest {
  public volumeId: string;
  public text: string;
  public rating: number;

  constructor( volumeId: string, text: string, rating:number) {
    this.rating = rating;
    this.text = text;
    this.volumeId = volumeId;
  }
}