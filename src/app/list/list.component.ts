import { Component, OnInit } from '@angular/core';
import { Item } from '../common/item';
import { StateService } from '../common/state.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  items: Item[];

  constructor(private stateService: StateService) {
  }

  getItems() {
    this.stateService.getState().then(state => this.items = state);
  }

  ngOnInit() {
    this.getItems();
  }

  selectPost($event, item) {
    $event.stopPropagation();
    this.stateService.selectItem(item);
  }

}
