export interface DeviceTrackingResultDto {

    UTC: Date;

    Latitude: number;
    Longitude: number;
    Speed: number;
    Direction: number;
    ReasonForSaving: number;
    Altitude: number;
    SatalitesInView: number;

    InteralBatteryVoltage: number;
    ExternalBatteryVoltage: number;

  }
  