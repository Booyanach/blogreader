import { Component, OnInit, Input } from '@angular/core';

import { Item } from '../common/item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {

  @Input() item: Item;

  constructor() { }

  ngOnInit() {
  }

  setFavorite($event) {
    $event.stopPropagation();
    this.item.favorite = !this.item.favorite;
  }
}
