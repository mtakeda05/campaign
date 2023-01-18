import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Owner } from '../interfaces/owner.interface';


@Injectable({
  providedIn: 'root'
})
export class CampaignOwnerService {
  owners: Owner[] = [];
  
  constructor() {
    if (!this.owners.length) {
      const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      // Create 100 owners
      for (let i = 0; i < 100; i++) {
        const id = Array.from({length: 8}, () => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
        const name = 'Owner ' + (i + 1);
        const email = (i + 1) + '@example.com';
        const customers = [];
        // Each owner has a random number of customers from 3 to 100
        const customerCount = Math.floor(Math.random() * 98) + 3;
        for (let j = 0; j < customerCount; j++) {
          const customerId = Array.from({length: 8}, () => possible.charAt(Math.floor(Math.random() * possible.length))).join('');
          const customerName = 'Customer ' + (j + 1);
          const customerEmail = 'customer' + (j + 1) + '@example.com';
          const customerStatus = Math.floor(Math.random() * 4) + 1;
          const customerEmails = Math.floor(Math.random() * 10);
          customers.push({id: customerId, name: customerName, email: customerEmail, status: customerStatus, emails: customerEmails});
        }
        this.owners.push({id: id, name: name, email: email, customers: customers});
      }
    }
  }

  getOwners(): Observable<Owner[]> {
    return of(this.owners);
  }

  /**
   * Actual app fetches data from the server side.
  getOwners (): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl)
      .pipe(
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }
  **/
}

