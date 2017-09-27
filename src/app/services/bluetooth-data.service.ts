import { Injectable } from '@angular/core';
import { BLEData } from './../classes/ble-data.class';

import { Observable, Subscriber } from 'rxjs/Rx';

// import 'rxjs/add/operator/Observable';

@Injectable()
export class BluetoothDataService {
  
  bleData: BLEData[];

  constructor() {
    this.bleData = [
      // Non-SENSEi data (to be filtered out)
      {
          advertising: {
              kCBAdvDataIsConnectable: 0,
              kCBAdvDataManufacturerData: {
                  CDVType: "ArrayBuffer",
                  data: "BgABCSAAK6LaajHJ1gSWudHh5EE1d9n35W5ih5A="
              }
          },
          id: "3ADAEC3F-0B4F-4FD6-8543-B770B5F178DB",
          rssi: "-70"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1
          },
          id: "808FE493-4028-48C0-BE88-A51E055C9D3C",
          rssi: "-85"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1
          },
          id: "E106E9E2-360C-4E99-AB91-0F49A2851F62",
          rssi: "-50"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 0,
              kCBAdvDataManufacturerData: {
                  CDVType: "ArrayBuffer",
                  data: "BgABCSAAOBq7fpEslVI8lgmTHSiejSDnyaC7oYU="
              }
          },
          id: "72963D88-1221-47F6-B14D-2ED0CB0D773A",
          rssi: "-85"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1
          },
          id: "A2B8D89B-1B58-4B9B-AAA1-11AB2FFA7C71",
          rssi: "127"
      },
  
      // SENSEi data - first round
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "C4A4AF33-4ACD-495E-8267-AF851EE397D9",
          name: "SENSEi",
          rssi: "-76"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "2F8AA800-D44D-404D-B9CC-2DC26217D1CB",
          name: "SENSEi",
          rssi: "-79"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "FED1A577-AF62-4874-B8A6-117CF7C4AFBB",
          name: "SENSEi",
          rssi: "-73"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "49D68BFD-ACEA-4148-9D89-B60243F3AAD8",
          name: "SENSEi",
          rssi: "-80"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "D70682B1-6009-4D1F-A78F-4D03791CB530",
          name: "SENSEi",
          rssi: "-84"
      },
  
      // SENSEi data - second round (different RSSI, to be filtered out)
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "C4A4AF33-4ACD-495E-8267-AF851EE397D9",
          name: "SENSEi",
          rssi: "-70"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "2F8AA800-D44D-404D-B9CC-2DC26217D1CB",
          name: "SENSEi",
          rssi: "-89"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "FED1A577-AF62-4874-B8A6-117CF7C4AFBB",
          name: "SENSEi",
          rssi: "-77"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "49D68BFD-ACEA-4148-9D89-B60243F3AAD8",
          name: "SENSEi",
          rssi: "-50"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "D70682B1-6009-4D1F-A78F-4D03791CB530",
          name: "SENSEi",
          rssi: "-74"
      },
  
      // SENSEi data - third round (same RSSI, should be taken as the Mode)
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "C4A4AF33-4ACD-495E-8267-AF851EE397D9",
          name: "SENSEi",
          rssi: "-76"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "2F8AA800-D44D-404D-B9CC-2DC26217D1CB",
          name: "SENSEi",
          rssi: "-79"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "FED1A577-AF62-4874-B8A6-117CF7C4AFBB",
          name: "SENSEi",
          rssi: "-73"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "49D68BFD-ACEA-4148-9D89-B60243F3AAD8",
          name: "SENSEi",
          rssi: "-80"
      },
      {
          advertising: {
              kCBAdvDataIsConnectable: 1,
              kCBAdvDataServiceUUIDs: ["00431C4A-A7A4-428B-A96D-D92D43C8C7CF"]
          },
          id: "D70682B1-6009-4D1F-A78F-4D03791CB530",
          name: "SENSEi",
          rssi: "-84"
      }
    ];
  
  }

  getRawData(): BLEData[] {
    return this.bleData;
  }

  getStreamedData(): Observable<BLEData> {
    return Observable.from(this.bleData).zip(Observable.interval(500), (a, b) => a);
  }
}
