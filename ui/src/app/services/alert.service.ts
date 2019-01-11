import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AlertService {
  public alert: Subject<string> = new Subject();

  public showAlert(text: string): void {
    this.alert.next(text);
  }
}