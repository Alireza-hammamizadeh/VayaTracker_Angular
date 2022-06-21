
export class ChangeDeviceSettingsRequestDto {
    constructor(

        public DeviceSerial:string,
        public Icon:number,
 
        public Name:string,
        public LicensePlate: string,
        public DriverName: string,
        public DriverMobile: string,
        public MoreDetails: string,

        public  EngineStatus:boolean,
        public  EngineOffSafe:boolean,
 
        )
        {
    
        }

}