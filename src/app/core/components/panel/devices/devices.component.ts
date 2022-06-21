import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClipboardService } from 'ngx-clipboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { PanelDevicesListDto, PanelDevicesListItem } from 'src/app/core/models/Panel/PanelDevicesListDto';
import { DateConverterService } from 'src/app/core/services/common/dateconverter.service';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { TranslatorService } from 'src/app/core/services/features/translator.service';
import { EncryptionService } from 'src/app/core/services/security/encryption.service';
import { AuthenticationService } from 'src/app/core/services/user/authentication.service';
import { PanelService } from 'src/app/core/services/user/panel.service';
import { VayaTrackerHelper } from 'src/app/core/utilities/VayaTrackerHelper';




declare var $: any;

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss']
})
export class DevicesComponent implements OnInit,OnDestroy,AfterViewInit {


  // @ViewChild('inputFilterText')  inputFilterText! :ElementRef;
  
  DataRefresher : any; 

  devices: Array<PanelDevicesListItem> = new Array<PanelDevicesListItem>();

  devicesFilter!:PanelDevicesListDto;

  pages: number[] = [];
  width:number = 300;

  qrInfo:string='';
 

  
  constructor(
    private activatedroute: ActivatedRoute,
    public dateService: DateConverterService,
    private authenticationService: AuthenticationService,
    private panelService: PanelService,
    private router: Router,
    private spinner: NgxSpinnerService,
    public translatorService: TranslatorService,
    private toastService: ToastService,
    private clipboardApi: ClipboardService,
    private vayaTrackerHelper : VayaTrackerHelper,
    private encryptionService:EncryptionService,
    private cdRef:ChangeDetectorRef
  ) {

    this.DataRefresher = setInterval(() => {
      this.reloadDevices();
    }, 30000);


    this.devicesFilter = new PanelDevicesListDto(
      false,
      '',
      '',
      [],
      0,
      0,
      1,
      1,
      6,
      6,
      0
    );



   }

  ngOnInit(): void {
    this.devices = this.authenticationService.getUserDevices();
    //console.log(this.devices);
    this.reloadDevices();
  }

 

 


  ngOnDestroy(): void {
    $("#btnFullwidthSearch").prop("onclick", null).off("click");
    $("#btnMobileSearch").prop("onclick", null).off("click");
    $("#inputFullwidthSearch").val('');
    clearInterval(this.DataRefresher);
  }
 

  ngAfterViewInit(): void {
    $('#btnFullwidthSearch').click(function() {
      alert( "btnFullwidthSearch From Devices" );
    });
    $('#btnMobileSearch').click(function() {
      alert( "btnMobileSearch From Devices" );
    });
    $("#inputMobileSearch").val('');
    $("#inputFullwidthSearch").val('');
}


  ReGenerateTrackingLink(deviceSerial:any)
  {

  }

  reloadDevices(){
 
    this.devicesFilter.Devices=[];

    // for (let i = 1; this.devicesFilter.PageCount >= i; i++) {
    //   $('#pageContainerDiv' + i).remove();
    // }

    clearInterval(this.DataRefresher);

    this.spinner.show();
    this.panelService.getUserDevices(this.devicesFilter).subscribe(
      (res) => {
        try 
          {
            var dec = this.encryptionService.Decrypt(res.x);
            let arg = JSON.parse(dec);
            if(arg != null)
            {
              if (arg.IsSuccess) {
                this.authenticationService.setUserDevices(arg.Devices);
                this.devices = this.authenticationService.getUserDevices();
              }  
              this.devicesFilter = arg;
              //Paging
              for (
                let i = this.devicesFilter.StartPage;
                i <= this.devicesFilter.EndPage;
                i++
              ) {
                this.pages.push(i);
              }
     
            }
            this.spinner.hide();
        }
        catch
        {
         this.toastService.RemoveAll();
         this.toastService.Error(
           '',
           this.translatorService.getStringFromJsonFile(
             'Result.UnknownError'
           )
         );
         this.spinner.hide();
        }
      },
      (error) => {
        console.log('Reload Here - Error');
        this.toastService.RemoveAll();
        this.toastService.Error(
          '',
          this.translatorService.getStringFromJsonFile('Result.ConnectionError')
        );
        this.spinner.hide();
      }
    );

    this.DataRefresher = setInterval(() => {
      this.reloadDevices();
    }, 30000);

  }
 

}
