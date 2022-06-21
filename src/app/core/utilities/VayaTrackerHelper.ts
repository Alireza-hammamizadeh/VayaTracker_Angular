import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { PanelDevicesListItem } from '../models/Panel/PanelDevicesListDto';
import { DateConverterService } from '../services/common/dateconverter.service';
import { TranslatorService } from '../services/features/translator.service';

 
@Injectable({
  providedIn: 'root',
})
export class VayaTrackerHelper {


    constructor(
        public dateService: DateConverterService,
        public translatorService: TranslatorService,
        @Inject(DOCUMENT) private document: any
      ) {
    
      }

      DeviceTrackinginfo(item:PanelDevicesListItem):string
      {
          return this.document.location.origin + '/devicetracking/' + item.MonitoringToken ;
      }
      DeviceTrackinginfoToken(token:string):string
    {
        return this.document.location.origin + '/devicetracking/' + token;
    }

     GetDeviceServiceLinktype(type: number): string 
     {
        if (type == 1) {
            return 'tracker';
          } else if (type == 2) {
            return 'logger';
          }else if (type == 3) {
            return 'advancedtracker';
          }else if (type == 4) {
            return 'powerbanktracker';
          }
      
          return 'Error';
     }

     GetDeviceModelName(type: number): string {
        if (type == 1) {
          return 'ردیاب';
        } else if (type == 2) {
          return 'لاگر';
        } else if (type == 3) {
          return 'ردیاب پیشرفته';
        } else if (type == 4) {
          return 'ردیاب پاوربانک';
        }
    
        return 'خطا';
      }


      GetTitleClass(lastConnection: Date, sampleTime: number): string {
        let passed = this.dateService.getPassedMinutes(lastConnection);
        if (sampleTime > passed) {
          return 'alert alert-success text-center';
        } else if (sampleTime * 2 > passed) {
          return 'alert alert-warning text-center';
        }
        return 'alert alert-danger text-center';
      }
 

      GetInternalBatteryPersend(voltage : number) : string
      {
        const maxVoltage : number= 4.1 ;
        const minVoltage : number= 3.7 ;

        let persent =( maxVoltage - voltage) * (100.0 / (maxVoltage - minVoltage)) ;
        persent = 100.0 - persent ;
        if( persent < 0 )
        {
          persent = 0 ;
        }
        else if( voltage >= maxVoltage)
        {
          persent = 100;
        }
        persent = Math.trunc(persent);
        return persent.toString();;

      }


 
}
