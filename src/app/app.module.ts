import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { ItemComponent } from './item/item.component';
import { PostComponent } from './post/post.component';
import { EllipsisPipe } from './common/ellipsis.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ItemComponent,
    PostComponent,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
