import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VayaTrackerHelperService {

  constructor() { }

  GetDeviceModelName(type: number): string {
    if (type == 1) {
      return 'Inputs.DeviceModelTracker';
    } else if (type == 2) {
      return 'Inputs.DeviceModelLogger';
    } else if (type == 3) {
      return 'Inputs.DeviceModelAdvancedCarTracker';
    } else if (type == 4) {
      return 'Inputs.DeviceModelPowerBankTracker';
    }

    return 'خطا';
  }
}
 