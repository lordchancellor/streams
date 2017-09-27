import { Component, OnInit } from '@angular/core';

import { BluetoothDataService } from './services/bluetooth-data.service';
// import { Observable } from 'rxjs/Rx';
import { timer } from 'rxjs/observable/timer';

import { BLEData } from './classes/ble-data.class';

import * as MathJS from 'mathjs';

@Component({
  selector: 'app-root',
  template: `
    <h1>Streams Test</h1>
    
    <p>Here be the raw data:</p>
    <ul>
      <li *ngFor="let data of bleRawData">{{ data.name }}, {{ data.id }}, {{ data.rssi }}</li>
    </ul>

    <hr>

    <p>Here be the filtered data:</p>
    <ul>
      <li *ngFor="let data of bleDataStream">{{ data.name }}, {{ data.id }}, {{ data.rssi }}</li>
    </ul>
      `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  bleRawData: BLEData[];
  bleDataStream: BLEData[];

  constructor(private bluetoothData: BluetoothDataService) {
    this.bleRawData = [];
    this.bleDataStream = [];
  }

  ngOnInit(): void {
    this.bleRawData = this.bluetoothData.getRawData();

    this.bluetoothData.getStreamedData()
      .do(val => console.log('Got ', val))
      .filter(data => data.name === 'SENSEi')
      .groupBy(data => data.id)
      .subscribe(groupedObservable => {
        groupedObservable
          .reduce((aggregateDevice, currentDevice) => {
            if (!aggregateDevice.hasOwnProperty('rssiTotals')) {
              aggregateDevice.rssiTotals = [aggregateDevice.rssi, currentDevice.rssi];
            } else {
              aggregateDevice.rssiTotals = [...aggregateDevice.rssiTotals, currentDevice.rssi];
            }

            return aggregateDevice;
          })
          .do((device) => {
            let rssiTotals = device.rssiTotals;
            let mode = MathJS.mode(rssiTotals);

            device.rssi = mode.length === 1 ? mode[0] : MathJS.median(rssiTotals).toString();

            Reflect.deleteProperty(device, 'rssiTotals');

            return device;
          })
          .do(val => console.log(val))
          .subscribe(device => this.bleDataStream.push(device));
      });

  }

}