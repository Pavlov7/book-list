import { Observable } from 'rxjs';

export interface BaseResourceService {
  search(query: string): Observable<any>;
  getPage(number: number): Observable<any>;
}