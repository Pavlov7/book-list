import { Volume } from './volume.model';

export class BooksApiResponse {
  public items: Volume[];
  public kind: string;
  public totalItems: number;
}