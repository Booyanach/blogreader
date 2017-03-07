import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Item } from './item';

@Injectable()
export class StateService {

  selectedItem: Item;
  state: Item[];
  url: String = 'http://jsonplaceholder.typicode.com/posts';

  constructor(private http: Http) {
  }

  getState(): Promise<Item[]> {
    return Promise.resolve(this.callApi(
      this.url,
      response => this.state = response.json() as Item[]
    ));
  }

  getSelectedItem(): Promise<Item> {
    return Promise.resolve(this.selectedItem);
  }

  selectItem(item: Item) {
    this.selectedItem = item;
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
