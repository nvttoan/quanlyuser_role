import { Injectable } from '@angular/core';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private notification : NzNotificationService) { }

  success(message: string){
    this.notification.create("success", 'Thông báo', message);
  }

  error(message: string){
    this.notification.create("error", 'Thông báo', message);
  }

  warning(message: string){
    this.notification.create("warning", 'Thông báo', message);
  }

}
