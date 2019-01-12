export class ReviewApiRequest {
  public volumeId: string;
  public text: string;
  public rating: number;

  constructor(volumeId: string) {
    this.volumeId = volumeId;
  }
}