export class CommentApiRequest {
  public reviewId: number;
  public text: string;

  constructor(reviewId:number, text:string) {
    this.reviewId = reviewId;
    this.text = text;
  }
}