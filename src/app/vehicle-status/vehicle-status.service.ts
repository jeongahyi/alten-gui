import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, timer, BehaviorSubject } from 'rxjs';
import { switchMap, concatMap, map } from 'rxjs/operators';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { StatusCounter } from '../models/status-counter';
import { VehicleInfo } from '../models/vehicle-info';

@Injectable({
  providedIn: 'root'
})
export class VehicleStatusService {
  public changedCounterState: EventEmitter<StatusCounter> = new EventEmitter<StatusCounter>();
  private load$ = new BehaviorSubject('');
  private vehicleInfo$: Observable<VehicleInfo[]>;
  private lastStatusCounter: StatusCounter = { numOfOnline: 0, numOfOffline: 0 };

  constructor(private http: HttpClient) {
    // interval time is defined in environment file
    this.polling(environment.config.pollingIntervalTime);
  }

  // return the information of vehicles and customers
  public getVehicleInfo(): Observable<VehicleInfo[]> {
    return this.vehicleInfo$;
  }

  // update dataset from DB every fixed time
  public polling(pollingInterval: number) {
    this.vehicleInfo$ = this.load$.pipe(
      switchMap(_ => timer(1, pollingInterval).pipe(
        concatMap(_ => this.http.get<VehicleInfo[]>(environment.url.get.vehicles)),
        map((res) => this.setStates(res))
      ))
    );
  }

  // set response data into local dataset
  public setStates(items: VehicleInfo[]) {
    const vehicles: VehicleInfo[] = [];
    let countOnline = 0;
    let countOffline = 0;

    items.forEach(item => {
      const status = item.status;
      const vehicle: VehicleInfo = {
        id: this.setValue(item.id),
        status: this.setStatus(status),
        vehicle_id: this.setValue(item.vehicle_id),
        registration_number: this.setValue(item.registration_number),
        owner_name: this.setValue(item.owner_name),
        owner_address: this.setValue(item.owner_address),
      };
      vehicles.push(vehicle);

      // count the status of vehicle
      if (vehicle.status.toLowerCase() === 'online') {
        countOnline++;
      } else {
        countOffline++;
      }
    });

    // compare current sum of status to last one
    if (this.lastStatusCounter.numOfOnline !== countOnline
      || this.lastStatusCounter.numOfOffline !== countOffline) {
      // update lastCounter value to current one
      this.lastStatusCounter.numOfOnline = countOnline;
      this.lastStatusCounter.numOfOffline = countOffline;

      // emit the changed value to subscribers
      this.changedCounterState.emit({ numOfOnline: countOnline, numOfOffline: countOffline });
    } else { }

    return vehicles.sort((a, b) => a.id > b.id ? 1 : -1);
  }

  public setStatus(status: string): string {
    return status && status.toLowerCase() === 'online' ? 'Online' : 'Offline';
  }

  public setValue(value: string): string {
    return value ? value : '-';
  }
}
