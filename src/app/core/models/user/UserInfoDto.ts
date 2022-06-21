import { PanelDevicesListItem } from "../Panel/PanelDevicesListDto";

export class UserInfoDto {
    constructor(
      public Token: string,
      public FirstName: string,
      public LastName: string,
      public UserId: number,
      public UserBalance: number,
      public AvatarFilePath: string,
      public Mobile: string,
      public Email: string,
      public EmailIsConfirm: boolean,
      public RegisterDate : Date,
      public UserPermissions: number[] ,
      public Devices : Array<PanelDevicesListItem>,
      public HaveNewNotification : boolean
    ) {}
  }
  