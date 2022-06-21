import { DeviceModelType } from "../../Devices/IDeviceMoldelType";

export class AdminOnlineTrackingDto {
    constructor(
      public DeviceSerial: string,
      public DeviceModel: DeviceModelType,
      
      public IsEnable : boolean,
      public LastConnectionTime : Date,
    
      public Icon : number,
      public Name : string,

      public IsSettingsUpdate : boolean,
      public SettingsUpdateTime :Date,

      public HaveNewPoint : boolean,
      public LastPointData : string

    ) {}
}