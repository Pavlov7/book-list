import { AccessInfo } from './access-info.model';
import { SaleInfo } from './sale-info.model';
import { VolumeInfo } from './volume-info.model';

export class Volume {
  public accessInfo: AccessInfo;
  public etag: string;
  public id: string;
  public kind: string;
  public saleInfo: SaleInfo;
  public searchInfo: {
    textSnippet: string
  };
  public selfLink: string;
  public volumeInfo: VolumeInfo;
}