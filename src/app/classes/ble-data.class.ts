export class BLEData {

  advertising: {
    kCBAdvDataIsConnectable: number,
    kCBAdvDataManufacturerData?: {
      CDVType: string,
      data: string
    },
    kCBAdvDataLocalName?: string,
    kCBAdvDataServiceUUIDs?: string[]
  };
  id: string;
  name?: string;
  rssi: string;
  rssiTotals?: string[];

}