export enum  DeviceModelType
 {
     Model_CarTracker = 1,
     Model_LocationLogger = 2,
     Model_AdvancedCarTracker = 3,
     Model_PowerBankTracker = 4,
 }

 export enum  LoggerTrackingMode
{
   
	Mode_NoAction = 0,      //No Action
    Mode_Logger = 1,      //Normall Work
    Mode_OnlineTracking = 2,      //OnlineTracking With Algoritm
    Mode_PowerOff = 3       //Device Is not Send And Wait For Power Key Button TO Turn On 
}


export enum  PowerBankTrackerTrackingMode
{
    Mode_Logger = 1,      //Normall Work
    Mode_OnlineTracking = 2,      //OnlineTracking With Algoritm
}



 export class DeviceModels {
    constructor(   
    ) {}

    GetDeviceModelName(model : DeviceModelType) : string
    {
        if( model == DeviceModelType.Model_CarTracker)
        {
            return 'ردیاب';
        }
        else  if( model == DeviceModelType.Model_LocationLogger)
        {
            return 'لاگر';
        }
        else  if( model == DeviceModelType.Model_AdvancedCarTracker)
        {
            return 'ردیاب پیشرفته';
        }
        else  if( model == DeviceModelType.Model_PowerBankTracker)
        {
            return 'ردیاب پاوربانک';
        }
        return 'مدل ثبت نشده است';
    }

    GetDeviceModelServiceAddress(model : DeviceModelType) : string
    {
        if( model == DeviceModelType.Model_CarTracker)
        {
            return 'tracker';
        }
        else  if( model == DeviceModelType.Model_LocationLogger)
        {
            return 'logger';
        }
        else  if( model == DeviceModelType.Model_AdvancedCarTracker)
        {
            return 'advancedtracker';
        }
        else  if( model == DeviceModelType.Model_PowerBankTracker)
        {
            return 'powerbanktracker';
        }
        return 'مدل ثبت نشده است';
    }

  }