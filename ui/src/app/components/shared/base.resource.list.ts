import { AlertService } from '../../services/alert.service';

export class BaseResourceList {
  protected loading: boolean = true;
  protected notFound: boolean = false;
  protected items: any[];
  protected totalCount: number = 0;
  protected page: number = 0;
  protected pageSize: number = 10;
}
