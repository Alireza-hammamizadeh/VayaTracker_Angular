import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { CurrentUserDto } from 'src/app/core/models/user/CurrentUserDto';
import { DateConverterService } from 'src/app/core/services/common/dateconverter.service';
import { AuthenticationService } from 'src/app/core/services/user/authentication.service';

import {Location} from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit,OnDestroy {

  user!: CurrentUserDto ;

  nowDateTime:string='';
  timeRefresher : any;

  currentUrl:string='';

  constructor(
    public authenticationService: AuthenticationService,
    public dateService: DateConverterService,
    private router: Router,
    private location: Location
  ) {
    this.location.onUrlChange(x => this.currentUrl = x );
   }


  ngOnDestroy(): void {
     clearInterval(this.timeRefresher); 
  }

 


  ngOnInit(): void {

    this.nowDateTime = this.dateService.Now(true);
    this.timeRefresher= setInterval(() => {
      this.nowDateTime = this.dateService.Now(true);
    }, 100);
    
    this.authenticationService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
 
  }
}
