import { User } from './user.model';

export class Review {
  public id: string;
  public user: User;
  public volumeId: string;
  public text: string;
  public rating: number;
}