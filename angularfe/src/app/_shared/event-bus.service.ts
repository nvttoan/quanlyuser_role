import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { EventData } from './event.class';

@Injectable({//quản lý truyền event giữa các component
  providedIn: 'root',
})
export class EventBusService {
  private subject$ = new Subject<EventData>();

  emit(event: EventData) {//đưa event vào dt subject
    this.subject$.next(event);
  }

  on(eventName: string, action: any): Subscription {
    return this.subject$.pipe(//đăng kí hành động khi có sự kiện 
      filter((e: EventData) => e.name === eventName),
      map((e: EventData) => e["value"])).subscribe(action);
  }
}
