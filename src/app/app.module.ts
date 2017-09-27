import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BluetoothDataService } from './services/bluetooth-data.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    BluetoothDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
