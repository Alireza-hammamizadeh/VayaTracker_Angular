import { Component, OnInit } from '@angular/core';
import { CurrentUserDto } from 'src/app/core/models/user/CurrentUserDto';
import { AuthenticationService } from 'src/app/core/services/user/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  user!: CurrentUserDto ;

  
  constructor(
    public authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {

    this.authenticationService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
 
  }

}
