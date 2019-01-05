export class AccessInfo {
  public accessViewStatus: string;
  public country: string;
  public embeddable: boolean;
  public epub: {
    isAvailable: boolean
  };
  public pdf: {
    isAvailable: boolean
  };
  public publicDomain: boolean;
  public quoteSharingAllowed: boolean;
  public textToSpeechPermission: string;
  public viewability: string;
  public webReaderLink: string;
}