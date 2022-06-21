
import { IResponseDto } from './../../../models/IResponseDto';
import { AdminAddDeviceRequestDto } from './../../../models/Admin/Devices/AdminAddDeviceRequestDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';
import { Observable } from 'rxjs';
import { AdminDevicesListDto } from 'src/app/core/models/Admin/Devices/AdminDevicesListDto';
import { EncryptionService } from '../../security/encryption.service';
import { AccountGeneralRequestDto } from 'src/app/core/models/Account/AccountGeneralRequestDto';
import { PanelDeviceSerialInfoDto } from 'src/app/core/models/Devices/PanelDeviceSerialInfoDto';
import { DeviceSearchPointsRequestDto } from 'src/app/core/models/Devices/common/DeviceSearchPointsRequestDto';
 

@Injectable({
  providedIn: 'root'
})
export class AdminDevicesService {
  constructor(
    private http: HttpClient,
    private encryptionService:EncryptionService
  ) { }

  addNewDevice(
    request: AdminAddDeviceRequestDto
  ): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/admin/devices/addnewdevice',
      x
    );
  }

  getDevicesList(request : AdminDevicesListDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/admin/devices/getdeviceslist',
       x
       );
  }

  
  onlineTracking(request : PanelDeviceSerialInfoDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/admin/devices/onlinetracking',
       x
       );
  }

  searchPoints(request:DeviceSearchPointsRequestDto): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/admin/devices/SearchPoints',
      x
    );
  }



    //Get Device Setting
    getDeviceSetting(request:PanelDeviceSerialInfoDto) :  Observable<AccountGeneralRequestDto> {
      return this.http.post<AccountGeneralRequestDto>('/admin/devices/GetDeviceSetting', request);
    }
    // setDeviceSetting(request:AdminDeviceSettingDto):Observable<IResponseDto<null>>
    // {
    //   return this.http.post<IResponseDto<null>>('/admin/devices/SetDeviceSetting', request);
    // }
 
}
