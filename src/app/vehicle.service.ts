import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Vehicle } from './models/vehicle';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private db: AngularFireDatabase) { }

  public getVehicles(): Observable<any[]> {
    return this.db
      .list('/vehicles', (ref) => {
        return ref.orderByChild('id');
      })
      .valueChanges();
  }
}
