import { Injectable, EventEmitter } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import { Item } from './item';

@Injectable()
export class StateService {

   public selectedItem: EventEmitter<Item>;

  state: Item[];
  url: String = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {
    this.selectedItem = new EventEmitter();
  }

  getState(): Promise<Item[]> {
    return Promise.resolve(this.callApi(
      this.url,
      response => {
        this.state = response.json() as Item[];
        this.selectedItem.next(this.state[0]);
        return this.state;
      }
    ));
  }

  getSelectedItem(): Observable<Item> {
    return this.selectedItem;
  }

  selectItem(item: Item) {
    this.selectedItem.next(item);
  }

  private callApi(url: String, success: any): Promise<any> {
    return this.http.get(<string>url)
          .toPromise()
          .then(success)
          .catch(this.errorHandler);
  }

  errorHandler(e: any): Promise<any> {
    console.error('stateService', e);
    return Promise.reject(e.message || e);
  }

}
