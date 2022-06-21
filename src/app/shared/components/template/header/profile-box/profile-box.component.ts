import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { CurrentUserDto } from 'src/app/core/models/user/CurrentUserDto';
import { AuthenticationService } from 'src/app/core/services/user/authentication.service';

@Component({
  selector: 'app-profile-box',
  templateUrl: './profile-box.component.html',
  styleUrls: ['./profile-box.component.scss']
})
export class ProfileBoxComponent implements OnInit {

  //Device Model
  @Input('User') public User!: CurrentUserDto;

  constructor(
    public authenticationService: AuthenticationService,
    public router: Router,
    private spinner: NgxSpinnerService,
    private activatedroute: ActivatedRoute 
  ) {
  
   }

  ngOnInit(): void {

  }

  logOut() {
    this.spinner.show();
    this.authenticationService.logOutUser().subscribe(
      (res)=>
      {
       if(res.IsSuccess != undefined &&  res.IsSuccess)
       {
         
        localStorage.removeItem('VayaTracker_Token');
        localStorage.removeItem('VayaTracker_User');

        this.authenticationService.setCurrenUser(null, true);
         setTimeout(() => {
        
          localStorage.removeItem('VayaTracker_Token');
          localStorage.removeItem('VayaTracker_User');

          this.authenticationService.setCurrenUser(null, true);
          setTimeout(() => {
            this.router.navigate(['/login']);
          this.spinner.hide(); 
          }, 300);
         }, 200);
       }
       else
       {
        this.spinner.hide();
       }
      },
      (error)=>
      {
        this.spinner.hide();
      }
    )
  }

}
