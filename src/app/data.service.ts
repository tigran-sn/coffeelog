import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Coffee } from './logic/Coffee';
import { PlaceLocation } from './logic/PlaceLocation';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private http = inject(HttpClient);

  endpoint = 'http://localhost:3000';
  coffeeEntity = '/coffees';

  getList(callback: Function) {
    this.http
      .get(`${this.endpoint}${this.coffeeEntity}`)
      .subscribe((response: any) => {
        callback(response);
      });
  }

  get(coffeeId: string, callback: Function) {
    this.http
      .get(`${this.endpoint}${this.coffeeEntity}/${coffeeId}`)
      .subscribe((response: any) => {
        callback(response);
      });
  }

  save(coffee: any, callback: Function) {
    if (coffee._id) {
      this.http
        .put(`${this.endpoint}${this.coffeeEntity}/${coffee._id}`, coffee)
        .subscribe((response: any) => {
          callback(true);
        });
    } else {
      this.http
        .post(`${this.endpoint}${this.coffeeEntity}`, coffee)
        .subscribe((response: any) => {
          callback(true);
        });
    }
  }
}
