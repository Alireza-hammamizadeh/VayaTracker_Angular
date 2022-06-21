import { DOCUMENT } from '@angular/common';
import { Component, AfterViewInit, OnChanges, SimpleChanges, OnInit, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, map } from 'rxjs';
import { CurrentUserDto } from './core/models/user/CurrentUserDto';
import { ToastService } from './core/services/common/toast.service';
import { TranslatorService } from './core/services/features/translator.service';
import { EncryptionService } from './core/services/security/encryption.service';
import { AuthenticationService } from './core/services/user/authentication.service';
import { ElementTools } from './core/utilities/ElementTools';

 

declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent   {
  title = 'sash';

  enableLoader: any;
  reloadUserCOunter:number=0;
  reloaderDataWorker:any;


  constructor(
    private translatorService: TranslatorService,
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    private toastService: ToastService,
    private elementTools: ElementTools,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    @Inject(DOCUMENT) private document: any,
    private encryptionService : EncryptionService 
  )
  {

    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          
          let child = this.activatedRoute.firstChild;
          while (child) {
            if (child.firstChild) {
              child = child.firstChild;
            } else if (child.snapshot.data && child.snapshot.data['title']) {
              this.toastService.RemoveAll();
 
             if (document.body.classList.contains('sidebar-gone')) {
              document.body.classList.remove('sidenav-toggled');
             }
 
              return child.snapshot.data['title'];
            } else {
              
              return null;
            }
          }
          return null;
        })
      )
      .subscribe((data: any) => {
        if (data) {
          setTimeout(() => {
            let title='';
            for(let j = 0 ;20 > j ; j++ )
            {
              title = this.translatorService.getStringFromJsonFile('Titels.SiteName') +
              ' | ' +
              this.translatorService.getStringFromJsonFile('Titels.' + data) ;
              if( title.includes('Titels') == false)
              {
                break;
              }
            }
            this.titleService.setTitle(title );
          }, 250);
        }
      });
      setTimeout(() => {
        this.reloadPageTitle();
        //For Real Time Recaptcha Language Change
        //this.elementTools.changeRecaptchaElementLanguage(this.currentLanguage);
      }, 1000);
 
    
  }
  ngOnInit(): void {
  
    //During App
    if (this.authenticationService.isUserAuthentication()) {
      setInterval(() => {
        //console.log('reload user Info');
        this.authenticationService.reloadUserInformationFromServe();
      }, 120000);
    }

        //for first Time App Loaded
        this.reloaderDataWorker=setInterval(() => {
          this.authenticationService.chekUserAuthentication().subscribe(
          (res) => 
          {
    
            let dec = this.encryptionService.Decrypt(res.x);
            let response = JSON.parse(dec);
            if(response != null && response != undefined)
            {
              if (response.IsSuccess == true) 
              {
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
                this.authenticationService.setCurrenUser(currentUser, true);
                clearInterval(this.reloaderDataWorker);
              }
              else
              {
                this.reloadUserCOunter++;
                if( this.reloadUserCOunter > 0 )
                {
                  this.reloadUserCOunter = 0 ;
                  clearInterval(this.reloaderDataWorker);
                }
              }
            }
            else
            {
              this.reloadUserCOunter++;
            }
            if( this.reloadUserCOunter > 9 )
            {
              this.reloadUserCOunter = 0 ;
              clearInterval(this.reloaderDataWorker);
            }
          },
          (error)=>
          {
            this.reloadUserCOunter++;
            if( this.reloadUserCOunter > 4 )
            {
              this.reloadUserCOunter = 0 ;
              clearInterval(this.reloaderDataWorker);
              this.toastService.RemoveAll();
              this.toastService.Warning(
                '',
                this.translatorService.getStringFromJsonFile(
                  'Result.ConnectionError'
                )
              );
            }
          }
          );
        }, 2000);
     

  }
 
  reloadPageTitle():void
  {
    let child = this.activatedRoute.firstChild;
      if( child != null)
      {
        let title = this.translatorService.getStringFromJsonFile('Titels.SiteName') +
          ' | ' +
          this.translatorService.getStringFromJsonFile('Titels.' + child.snapshot.data['title']) ;
          this.titleService.setTitle(title );
      }
      else{
        let title = this.translatorService.getStringFromJsonFile('Titels.SiteName') ;
        this.titleService.setTitle(title );
      }

      this.ReInitScreenSize();

  }

  ngAfterViewInit() {

    // FULL SCREEN Resize
    $(document).on("click", ".fullscreen-button",  () => {
      setTimeout(() => {
        //console.log('click');
        this.ReInitScreenSize();
      }, 250);
    });
    this.ReInitScreenSize();
    setTimeout(() => {
      this.ReInitScreenSize(); 
    }, 1500);


    $('.app-sidebar__toggle').on('click', () => {
      setTimeout(() => {
        this.ReInitScreenSize();
      }, 1000);
    });
  
  }


  ReInitScreenSize():void{
      var offset = $("#app-content").offset();
      let mapDivHeight = $(window).innerHeight() - (offset.top + 32 );
      $("#app-content").css('min-height', mapDivHeight + 'px');
    
      $("#page").css('min-height', mapDivHeight + 'px');
      $("#side-app").css('height', mapDivHeight + 'px');

 
   }
}


