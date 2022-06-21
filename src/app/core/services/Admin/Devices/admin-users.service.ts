
import { IResponseDto } from '../../../models/IResponseDto';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../../user/authentication.service';
import { Observable } from 'rxjs';
import { EncryptionService } from '../../security/encryption.service';
import { AccountGeneralRequestDto } from 'src/app/core/models/Account/AccountGeneralRequestDto';
import { AdminAddUserRequestDto } from 'src/app/core/models/Admin/Users/AdminAddUserRequestDto';
import { AdminUsersListDto } from 'src/app/core/models/Admin/Users/AdminUsersListDto';
 

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {
  constructor(
    private http: HttpClient,
    private encryptionService:EncryptionService
  ) { 
    
  }

  addNewUser(
    request: AdminAddUserRequestDto
  ): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/admin/users/addnewuser',
      x
    );
  }

  getUsersList(
    request: AdminUsersListDto
  ): Observable<AccountGeneralRequestDto> {
    let jsonString = this.encryptionService.Encryp(JSON.stringify(request));
    let x=new AccountGeneralRequestDto(jsonString);
    return this.http.post<AccountGeneralRequestDto>(
      '/admin/users/GetUsersList',
      x
    );
  }
 
}
