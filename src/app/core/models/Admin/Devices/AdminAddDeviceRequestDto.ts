import { int } from "@zxing/library/esm/customTypings";
import { DeviceModelType } from "../../Devices/IDeviceMoldelType";


export class AdminAddDeviceRequestDto{
    constructor(
      public DeviceModel: DeviceModelType,
      public Imei: string
    ) {}
  }
  