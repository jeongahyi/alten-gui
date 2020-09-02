import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Customer } from './models/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  constructor(private db: AngularFireDatabase) { }

  public getCustomers(): Observable<any> {
    return this.db
      .list('/customers', (ref) => {
        return ref.orderByChild('id');
      })
      .valueChanges();
  }
}
