import { ActivatedRoute } from '@angular/router';
import { BaseResourceService } from './base.resource.service';
import { Observable } from 'rxjs';

export class BaseResourceList {
  protected loading: boolean = true;
  protected items: any[];
  protected totalCount: number = 0;
  protected page: number = 0;
  protected pageSize: number = 10;

  constructor(protected service: BaseResourceService) {}

  protected search(query: string): Observable<any> {
    return this.service.search(query);
  }

}
