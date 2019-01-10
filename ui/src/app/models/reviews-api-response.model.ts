import { Review } from './review.model';

export class ReviewsApiResponse {
  public items: Review[];
  public kind: string;
  public totalItems: number;
}