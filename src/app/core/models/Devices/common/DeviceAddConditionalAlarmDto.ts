import { ConditionTypes } from "../IDevicesConditionTypes";

 

export class DeviceAddConditionalAlarmDto {
  constructor(

    public Id: number,
    public DeviceSerial: string,

    public Title: string,
    public Type: ConditionTypes,

    public IsDisposable: boolean,
    public IsConditionEnable: boolean,
    public EventDate: Date,
    public CreateDate: Date,
    public IsDone: boolean,
    public AreaPoints: string

  ) {}
}
