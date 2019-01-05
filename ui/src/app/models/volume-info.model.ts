export class VolumeInfo {
  public allowAnonLogging: boolean;
  public authors: string[];
  public canonicalVolumeLink: string;
  public categories: string[];
  public contentVersion: string;
  public description: string;
  public imageLinks: {
    smallThumbnail: string;
    thumbnail: string
  };
  public industryIdentifiers: [
    {
      identifier: string | number;
      type: string
    }
  ];
  public infoLink: string;
  public language: string;
  public maturityRating: string;
  public pageCount: number;
  public previewLink: string;
  public printType: string;
  public publishedDate: string;
  public publisher: string;
  public readingModes: {
    text: boolean;
    image: boolean
  };
  public title: string;
}