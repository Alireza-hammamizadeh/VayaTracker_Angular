 
export class AdminUsersListDto {
    constructor(
      public IsSuccess: boolean,
      public Message: string,
      public Filter: string,
      public Users: AdminUsersListItem[],  
  
      //For Paging
      public PageId: number,
      public PageCount: number,
      public ActivePage: number,
      public StartPage: number,
      public EndPage: number,
      public TakeEntity: number,
      public SkipEntity: number,
      public FilterIsActive : number,
      public FilterIsLocked : number,
      public FilterIsMobileConfirmed : number
    ) {}
  }
  
  export class AdminUsersListItem {
    constructor(
        public userId: number,
        public UserBalance : number,
        public FirstName : string,
        public LastName : string,
        public Email : string,
        public Mobile : string,
        public LastSeenDate :Date,

        public IsActive : boolean,
        public IsLocked : boolean,
        public LockExpireDate :Date,
        public EmailIsConfirm : boolean,
        public MobileIsConfirm : boolean,
        public DevicesCount : number
      
    ) {}
  }
  