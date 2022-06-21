import { ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { PanelDevicesListItem } from 'src/app/core/models/Panel/PanelDevicesListDto';
import { CurrentUserDto } from 'src/app/core/models/user/CurrentUserDto';
import { DateConverterService } from 'src/app/core/services/common/dateconverter.service';
import { MapService } from 'src/app/core/services/common/map.service';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { TranslatorService } from 'src/app/core/services/features/translator.service';
import { EncryptionService } from 'src/app/core/services/security/encryption.service';
import { AuthenticationService } from 'src/app/core/services/user/authentication.service';
import { PanelService } from 'src/app/core/services/user/panel.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.scss']
})
export class DeviceComponent implements OnInit {

  
  
  deviceId: string = '';
  lastLanguage:string='';
  user!: CurrentUserDto;
  devices: Array<PanelDevicesListItem> = new Array<PanelDevicesListItem>();
  selectedDevice! : PanelDevicesListItem    ; 
  

  chekerTimer: any;
  redirectCounter = 0; 

  isABleToChangeDevice:boolean=true;

  constructor(
    private activatedroute: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastService: ToastService,
    private panelService: PanelService,
    private location: Location,
    private spinner: NgxSpinnerService,
    private mapService: MapService,
    private translatorService: TranslatorService,
    public dateService: DateConverterService,
    private injector: Injector,
    private encryptionService:EncryptionService,
    private cdRef:ChangeDetectorRef
  ) { 

    this.spinner.show();

    var id = this.activatedroute.snapshot.paramMap.get('id');
    //console.log(id);
    if (id != null && id.length == 32) {
      this.deviceId = id.toUpperCase();
    } else {
      this.router.navigate(['/panel/devices']);
    }

    this.authenticationService.getCurrentUser().subscribe((user) => {
      this.user = user;
      if( user != null)
      {
        this.authenticationService.setUserDevices(user.Devices);
        this.devices = this.authenticationService.getUserDevices();
      }
    });


    if (
      this.authenticationService.userHaveAccessToThisDevice(
        this.deviceId,
        this.user
      ) == false
    ) {
      this.spinner.show();
      this.chekerTimer = setInterval(() => {
        this.redirectCounter++;
        this.spinner.show();
        //Chek User Devices Or User Access
        if (
          this.authenticationService.userHaveAccessToThisDevice(
            this.deviceId,
            this.user
          ) == false
        ) {
          
          if (this.redirectCounter > 50) {
            clearInterval(this.chekerTimer);
            this.spinner.hide();
            this.router.navigate(['/panel/devices']);
          }
        } else {
          this.spinner.hide();
          clearInterval(this.chekerTimer);
          this.devices = this.authenticationService.getUserDevices();
        }
      }, 100);
    }
    this.changeUserDevice(this.deviceId);
 
  }
 



  ngOnInit(): void {

 
    this.translatorService.getActiveLanguage().subscribe((res)=>
    {

      if( this.lastLanguage !=res )
      {
        if( this.lastLanguage  != '')
        {
          
        }
        this.lastLanguage =res;
      
      }
      
 
 
      
    });
  }


  changeUserDevice(deviceid:string )
  {
    this.spinner.show();

    this.deviceId = deviceid;
    this.devices = this.authenticationService.getUserDevices();
    var selectTest = this.devices.find(element => element.DeviceSerial.toLocaleLowerCase() == deviceid.toLocaleLowerCase() );
    if(selectTest != undefined)
    {
      this.router.navigate([
        '/panel/device/' + this.deviceId.toLowerCase()
      ]);
      this.selectedDevice = selectTest;
    }
    else  
    {
      this.router.navigate([
          '/panel/devices'
      ]);
    }
    
    setTimeout(() => {
      this.spinner.hide();
    }, 300);
   
  }

}
 