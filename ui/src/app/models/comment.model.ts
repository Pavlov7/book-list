import { User } from './user.model';
import { Review } from './review.model';

export class Comment {
  public id: number;
  public user: User;
  public bookReview: Review;
  public text: string;
}