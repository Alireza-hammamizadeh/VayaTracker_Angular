
export class AdvancedCarTrackerSetAlarmSettingsDto {
    constructor(
  
      public DeviceSerial: string,
  
      public ConditionalNotificationEnable: boolean,
  
      //Alert Mobiles
      public Mobile1 :string,
      public Mobile2 :string,
      public Mobile3 :string,
  
      //Internal Battery
      public InternalBatteryMinimumVoltage: number,
      public InternalBatteryMinimumVoltageEnable: boolean,
  
      //External Battery
      public CarBatteryMinimumVoltage: number,
      public CarBatteryMinimumVoltageEnable: boolean,
  
      //Dynam Damage
      public DynamDamageVoltage: number,
      public DynamDamageVoltageEnable: boolean,
  
      
     //Speed Limit 
       public SpeedLimitValue: number,
       public SpeedLimitEnable: boolean,
  
       //Distance 
       public DistanceValue: number,
       public DistanceValueEnable: boolean,
  
       public SimCardBalanceAlarmEnable: boolean,
  
       //Car Status
       public EngineOnEnable: boolean,
       public EngineOffEnable: boolean,
       public CarStartMoveEnable: boolean,
       public CarStopMoveEnable: boolean,
       public CraneEnable: boolean,
       public ShockSensorEnable: boolean,
  
       //Service Reminder
       public CarServiceReminderEnable: boolean,
       public CarServiceReminderValue: number,

    ) {}
  }
  