import { Volume } from './volume.model';

export class BookApiResponse {
  public items: Volume[];
  public kind: string;
  public totalItems: number;
}