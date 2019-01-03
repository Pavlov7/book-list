import { ActivatedRoute } from '@angular/router';
import { BaseResourceService } from './base.resource.service';
import { Observable } from 'rxjs';

export class BaseResourceList {
  protected loading: boolean = true;
  protected items: any[];

  constructor(protected service: BaseResourceService) {}

  protected search(query: string): Observable<any> {
    return this.service.search(query);
  }

}
