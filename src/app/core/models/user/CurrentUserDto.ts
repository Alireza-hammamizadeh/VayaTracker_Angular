import { PanelDevicesListItem } from "../Panel/PanelDevicesListDto";

 


  export enum  PermissonTypes
 {
     //Admin Index Page
     AdminPanel = 1,
     //User Actions
     UserPanel,
     UserView,
     UserEdite,
     UserCreate,
     UserDelete,
     //Role Actions
     RolePanel,
     RoleView,
     RoleEdite,
     RoleCreate,
     RoleDelete,
     //Device Actions
     DevicePanel,
     DeviceView,
     DeviceEdite,
     DeviceCreate,
     DeviceDelete,

     //End Of Access
     EndPermissionIndex
 }

export class CurrentUserDto {
    constructor(
      public Token : string,
      public FirstName : string,
      public LastName : string,
      public UserId : number,
      public UserBalance : number,
      public Mobile: string,
      public Email: string,
      public EmailIsConfirm: boolean,
      public RegisterDate : Date,
      public UserPermissions: Array<Number> ,
      public Devices : Array<PanelDevicesListItem>,
      public HaveNewNotification : boolean
    ) {}
  }
  