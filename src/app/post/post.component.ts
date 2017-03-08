import { Component, OnInit } from '@angular/core';

import { Item } from '../common/item';
import { StateService } from '../common/state.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  item: Item;

  constructor(private stateService: StateService) {
  }

  getSelectedPost() {
    this.stateService.getSelectedItem().subscribe(item => this.item = item, this.errorHandler);
  }

  ngOnInit() {
    this.getSelectedPost();
  }

  errorHandler(e: any): void {
    console.error('postComponent', e);
  }

}
