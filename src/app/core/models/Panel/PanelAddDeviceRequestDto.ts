 
export class PanelAddDeviceRequestDto {
    constructor(
      public UserId : number,
      public SimcardNumber: string,
      public DeviceSerial: string,

      public Icon:number,

      public Name: string,
      public LicensePlate: string,
      public DriverName: string,
      public DriverMobile: string,
      public MoreDetails: string,

      public RecaptchaResponse: string
    ) {}
  }