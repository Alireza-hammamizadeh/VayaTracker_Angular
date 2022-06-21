
 
export class PanelNotificationsListDto {
    constructor(
      public UserId: number,
      public IsSuccess: boolean,
      public Message: string,
      public Filter: string,
      
      public DeviceSerial: string,

      public Notifications: PanelNotificationsListItem[],  
  
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
  
  export class PanelNotificationsListItem {
    constructor(
        public UserId : number,
        public NotificationId : number,
        public Title : string,
        public Message : string,
        public IsReaded : boolean,
        public ReadedDate : Date,
        public SendDate : Date,
        public Sender : string,
        public DeviceId : number,
        public LocationInformation : string
    ) {}
  }
  