import { Component, OnInit } from '@angular/core';
import { Item } from '../common/item';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  items: Item[];

  constructor() {
    this.items = [{id: 1, userid: 1, title: 'Hello', body: 'world'}];
  }

  ngOnInit() {
  }

}
