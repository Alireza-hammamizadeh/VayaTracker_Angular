import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountGeneralRequestDto } from '../../models/Account/AccountGeneralRequestDto';
import { AdvancedCarTrackerSetAlarmSettingsDto } from '../../models/Devices/AdvancedCarTracker/AdvancedCarTrackerSetAlarmSettingsDto';
import { ChangeDeviceSettingsRequestDto } from '../../models/Devices/common/ChangeDeviceSettingsRequestDto';
import { DeviceAddConditionalAlarmDto } from '../../models/Devices/common/DeviceAddConditionalAlarmDto';
import { DeviceConditionalAlarmInfoDto } from '../../models/Devices/common/DeviceConditionalAlarmInfoDto';
import { DeviceSearchPointsRequestDto } from '../../models/Devices/common/DeviceSearchPointsRequestDto';
import { DeviceTrackingRequestDto } from '../../models/Devices/common/DeviceTrackingRequestDto';
 
import { PanelDeviceSerialInfoDto } from '../../models/Devices/PanelDeviceSerialInfoDto';
import { IResponseDto } from '../../models/IResponseDto';
import { PanelAddDeviceRequestDto } from '../../models/Panel/PanelAddDeviceRequestDto';
import { PanelDevicesListDto } from '../../models/Panel/PanelDevicesListDto';
import { PanelNotificationsListDto, PanelNotificationsListItem } from '../../models/Panel/PanelNotificationsListDto';
import { EncryptionService } from '../security/encryption.service';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  constructor(
    private http: HttpClient,
    private encryptionService:EncryptionService
  ) {}

  getUserDevices(request:PanelDevicesListDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/GetUserDevices',
      x
    );
  }

  reGenerateTrackingToken(request:PanelDeviceSerialInfoDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/ReGenerateTrackingToken',
      x
    );
  }

  addNewDeviceToUser(request:PanelAddDeviceRequestDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/AddNewDeviceToUser',
      x
    );
  }

  removeDeviceFromUser(request:PanelDeviceSerialInfoDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/RemoveDeviceFromUser',
      x
    );
  }

  deleteDevicePoints(request:PanelDeviceSerialInfoDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/DeleteDevicePoints',
      x
    );
  }

  onlineTracking(request:PanelDeviceSerialInfoDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/OnlineTracking',
      x
    );
  }


  searchPoints(request:DeviceSearchPointsRequestDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/SearchPoints',
      x
    );
  }

 
 
  deviceSettings(request:ChangeDeviceSettingsRequestDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/DeviceSettings',
      x
    );
  }
 



  deviceTracking(request:DeviceTrackingRequestDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);

    return this.http.post<AccountGeneralRequestDto>(
      '/Api/Common/DeviceTracking',
      x
    );
  }


  addConditionalAlerts(request:DeviceAddConditionalAlarmDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);

    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/AddConditionalAlerts',
      x
    );
  }
 
  
  removeConditionalAlerts(request:DeviceConditionalAlarmInfoDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);

    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/RemoveConditionalAlerts',
      x
    );
  }


  GetDeviceNotificationsList(request:PanelNotificationsListDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);

    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/GetDeviceNotificationsList',
      x
    );
  }
  //Delete
  DeleteDeviceNotification(request:PanelNotificationsListItem): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);

    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/DeleteDeviceNotification',
      x
    );
  }



  //Advance Car Tacker 
  advancedCarTrackerSetAlarmSettings(request:AdvancedCarTrackerSetAlarmSettingsDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);

    return this.http.post<AccountGeneralRequestDto>(
      '/Panel/devices/AdvancedCarTrackerSetAlarmSettings',
      x
    );
  }

}
