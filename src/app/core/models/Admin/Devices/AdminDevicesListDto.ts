import { DeviceModelType } from "../../Devices/IDeviceMoldelType";

export class AdminDevicesListDto {
    constructor(
      public IsSuccess: boolean,
      public Message: string,
      public Filter: string,

      public FilterIsEnable : number,
      public ModelFilter : number,
      public FilterIsOnline : number,
      public FilterIsSold : number,

      public DevicesCount : number,
      public SoldDevicesCount : number,
      public OnlineDevicesCount : number,

      public Devices: DevicesListItem[],  
  
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
  
  export class DevicesListItem {
    constructor(
      public DeviceSerial: string,
      public DeviceModel: DeviceModelType,
      public Imei : string,
      public IsEnable : boolean,
      public LastConnectionTime : Date,
    
      public Icon : number,
      public Name : string,
      public LicensePlate : string,
      public DriverName : string,
      public DriverMobile : string,
      public MoreDetails : string,
      public MonitoringToken : string,
      
      
      public SimcardNumber : string,
      public SimcardBalance : number,
      public IsSettingsUpdate : boolean,
      public SettingsUpdateTime :Date,
      public StartWaranty : Date,
      public EndWaranty : Date,

      public FirmwareVersion : string,
      public HardwareVersion : string,

      public UserPhoneNumber : string,
      public UserFullName : string,
      public PanelExpireDate : Date ,
      public PanelIsEnable : boolean,
      public MaximumLastDaysToView : number,
      public MaximumLastDaysToSearch: number,
      public MaximumConditionalAlertsCount : number,


      public ApiIsEnable : boolean,
      public ApiLastRequestDate : Date,
      public ApiExpireDate : Date,
      public ApiRequestCounts : number,
      public ApiMaxRequestPerDay : number,
      public ApiTodayCounts : number,



    ) {}
  }
  