import { DeviceModelType } from "../Devices/IDeviceMoldelType";

 
export class PanelDevicesListDto {
    constructor(
      public IsSuccess: boolean,
      public Message: string,
      public Filter: string,
      public Devices: PanelDevicesListItem[],  
  
      //For Paging
      public PageId: number,
      public PageCount: number,
      public ActivePage: number,
      public StartPage: number,
      public EndPage: number,
      public TakeEntity: number,
      public SkipEntity: number
    ) {}
  }
  
  export class PanelDevicesListItem {
    constructor(
        public DeviceSerial: string,
        public DeviceModel: DeviceModelType,


        public IsEnable : boolean,
        public LastConnectionTime : Date,
        public IsSettingsUpdate : boolean,
        public SettingsUpdateTime : Date,
        public StartWaranty : Date,
        public EndWaranty : Date,


        public Icon : number ,
        public Name : string,
        public LicensePlate : string,
        public DriverName : string,
        public DriverMobile : string,
        public MoreDetails : string,
        public MonitoringToken : string,

        public HaveNewPoint : boolean,
        public LastPointData : string,
        public DeviceSettings : string,
        public AlarmSettings : string,
        public ConditionalAlerts : string,


        public HardWareVersion : string,
        public FirmwareVersion : string,

        public SimcardNumber : string,
        public SimcardBalance : number,

        public PanelExpireDate:Date,
        public PanelIsEnable:boolean,
        
        public MaximumLastDaysToView : number,
        public MaximumLastDaysToSearch:number
 
    ) {}
  }
  