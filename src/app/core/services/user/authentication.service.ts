import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AccountGeneralRequestDto } from '../../models/Account/AccountGeneralRequestDto';
import { ChangePasswordRequestDto } from '../../models/Account/ChangePasswordRequestDto';
import { ForgotPasswordRequestDto } from '../../models/Account/ForgotPasswordRequestDto';
import { LoginRequestDto } from '../../models/Account/LoginRequestDto';
import { MobileConfirmationRequestDto } from '../../models/Account/MobileConfirmationRequestDto';
import { RegisterRequestDto } from '../../models/Account/RegisterRequestDto';
import { SendActivationEmailRequestDto } from '../../models/Account/SendActivationEmailRequestDTO ';
import { UpdateUserInfoRequestDto } from '../../models/Account/UpdateUserInfoRequestDto';
import { IResponseDto } from '../../models/IResponseDto';
import { PanelDevicesListItem } from '../../models/Panel/PanelDevicesListDto';
import { CurrentUserDto, PermissonTypes } from '../../models/user/CurrentUserDto';
import { EncryptionService } from '../security/encryption.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isUserLogedIn = false;

  private currentUser: BehaviorSubject<any> = new BehaviorSubject<any>(null);

 
  constructor(private http: HttpClient , private encryptionService:EncryptionService) {
    try
    {
      let encryptedData = localStorage.getItem('VayaTracker_User') + '';
      encryptedData = encryptionService.Decrypt(encryptedData);
      var lastUser = JSON.parse(encryptedData);
      //console.log(lastUser);
      this.setCurrenUser(lastUser, false);
    }
    catch
    {
      this.setCurrenUser(null,true);
      //console.log('OOps Catch Happend');
    }
   }

 

   setCurrenUser(user: CurrentUserDto | null, actionOnUserData = false): void {
    if (user != null) {
      if (actionOnUserData) {
        if (user.Token != null && user.Token.length > 10) {
          localStorage.setItem('VayaTracker_Token', this.encryptionService.Encryp(user.Token));
        }
        user.Token = '';
        localStorage.setItem('VayaTracker_User',this.encryptionService.Encryp(JSON.stringify(user)));
      }
      this.isUserLogedIn = true;

      
    } else {
      if (actionOnUserData) {
        localStorage.removeItem('VayaTracker_Token');
        localStorage.removeItem('VayaTracker_User');
      }
      this.isUserLogedIn = false;
    }
    this.currentUser.next(user);
 
  }
  getCurrentUser(): Observable<CurrentUserDto> {
    return this.currentUser;
  }

  getUserPermissions() {
    if (this.currentUser.value != null) {
      // console.log(this.currentUser.value.UserPermissions);
      return this.currentUser.value.UserPermissions;
    }
    return null;
  }

  setUserDevices(devices: Array<PanelDevicesListItem>): void {
    this.currentUser.value.Devices = devices;
  }
  getUserDevices(): Array<PanelDevicesListItem> {
    return this.currentUser.value.Devices;
  }
  getUserDeviceName(deviceSerial: string, user: CurrentUserDto): string {
    if (deviceSerial.length != 32 || user.Devices == null) {
      return '';
    }
    for (let i = 0; user.Devices.length > i; i++) {
      if (
        user.Devices[i].DeviceSerial.toUpperCase() == deviceSerial.toUpperCase()
      ) {
        return user.Devices[i].Name;
      }
    }
    return 'عملیات دستگاه';
  }


  userHaveAccessToThisDevice(
    deviceSerial: string | null,
    user: CurrentUserDto
  ): boolean {
    if (deviceSerial == null) {
      return false;
    }
    if (user == null) {
      return false;
    }
    if (user.Devices == null) {
      return false;
    }
    //Normall Access
    for (let i of user.Devices) {
      if (i.DeviceSerial == deviceSerial) {
        return true;
      }
    }
    //Chek Adin Access
    if (user.UserPermissions.includes(PermissonTypes.DeviceView)) {
      return true;
    }
    return false;
  }

  userHaveThisAccess(
    deviceSerial: string | null,
    user: CurrentUserDto,
    access:number
  ): boolean {
    if (deviceSerial == null) {
      return false;
    }
    if (user == null) {
      return false;
    }
    //Chek Adin Access
    if (user.UserPermissions.includes(access)) {
      return true;
    }
    return false;
  }
  isUserAuthentication(): boolean {
    return this.isUserLogedIn;
  }
  reloadUserInformationFromServe() {
    this.chekUserAuthentication().subscribe((res) => {
      try
      {
        var dec = this.encryptionService.Decrypt(res.x);
        let response = JSON.parse(dec);
  
        if (response.IsSuccess == true) {
          let currentUser = new CurrentUserDto(
            response.Data.Token,
            response.Data.FirstName,
            response.Data.LastName,
            response.Data.UserId,
            response.Data.UserBalance,
            response.Data.Mobile,
            response.Data.Email,
            response.Data.EmailIsConfirm,
            response.Data.RegisterDate,
            response.Data.UserPermissions,
            response.Data.Devices,
            response.Data.HaveNewNotification
          );
          this.setCurrenUser(currentUser, true);
          //console.log(currentUser);
          //console.log('reload user Info -Ok');
        }
      }
      catch
      {
        //console.log('reload user Info -Error');
      }
    });
  }

  loginUser(request: LoginRequestDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>('/Account/Login', x);
  }
  logOutUser(): Observable<IResponseDto<null>> {
    return this.http.get<IResponseDto<null>>('/Account/LogOut');
  }

  chekUserAuthentication(): Observable<AccountGeneralRequestDto> {
    return this.http.post<AccountGeneralRequestDto>(
      '/Account/CheckUserAuthentication',
      ''
    );
  }

  registerUser(request: RegisterRequestDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>('/Account/Register', x);
  }

  mobileConfirmation(
    request: MobileConfirmationRequestDto
  ):  Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Account/MobileConfirmation',
      x
    );
  }

  forgotPassword(
    request: ForgotPasswordRequestDto
  ): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Account/ForgotPassword',
      x
    );
  }

  updateUserInformation(
    request: UpdateUserInfoRequestDto
  ): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Account/UpdateUserInformation',
      x
    );
  }

  changePassword(
    request: ChangePasswordRequestDto
  ): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Account/ChangePassword',
      x
    );
  }

  sendActivationEmail(
    request: SendActivationEmailRequestDto
  ): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Account/SendActivationEmail',
      x
    );
  }

}
