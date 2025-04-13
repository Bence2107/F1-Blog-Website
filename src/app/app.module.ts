import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {AppComponent} from './app.component';


@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    AppComponent,
  ],
  providers: [],
  bootstrap: []
})
export class AppModule { }
