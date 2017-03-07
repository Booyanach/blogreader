import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/of';

import { Item } from './item';

@Injectable()
export class StateService {

  selectedItem: Observable<Item>;
  observer: Observer<Item>;
  state: Item[];
  url: String = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {
    this.selectedItem = <Observable<Item>> new Observable(observer => this.observer = observer);
  }

  getState(): Promise<Item[]> {
    return Promise.resolve(this.callApi(
      this.url,
      response => {
        this.state = response.json() as Item[];
        this.observer.next(this.state[0]);
        return this.state;
      }
    ));
  }

  getSelectedItem(): Observable<Item> {
    return this.selectedItem;
  }

  selectItem(item: Item) {
    this.observer.next(item);
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
