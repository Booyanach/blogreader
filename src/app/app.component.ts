import { Component } from '@angular/core';
import { StateService } from './common/state.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [StateService]
})
export class AppComponent {
  title = 'app works!';
}
