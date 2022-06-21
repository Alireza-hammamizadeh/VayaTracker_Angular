import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClipboardService } from 'ngx-clipboard';
import { NgxSpinnerService } from 'ngx-spinner';
import { DeviceModelType } from 'src/app/core/models/Devices/IDeviceMoldelType';
import { PanelDevicesListItem } from 'src/app/core/models/Panel/PanelDevicesListDto';
import { DateConverterService } from 'src/app/core/services/common/dateconverter.service';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { TranslatorService } from 'src/app/core/services/features/translator.service';
import { VayaTrackerHelper } from 'src/app/core/utilities/VayaTrackerHelper';



declare var $: any;

@Component({
  selector: 'app-device-item',
  templateUrl: './device-item.component.html',
  styleUrls: ['./device-item.component.scss']
})
export class DeviceItemComponent implements OnInit {


  //Device Model
  @Input('Device') public Device!: PanelDevicesListItem;

   //For Output Emitter
  @Output()  ReGenerateLink = new EventEmitter<string>();


  qrInfo:string='';
  width:number = 230;
  refresher:any;

  

  pointPassedMinutes:number=0;
  cardTagClass='primary';

  constructor(
    public dateService: DateConverterService,
    public translatorService: TranslatorService,
    private toastService: ToastService,
    private clipboardApi: ClipboardService,
    private spinner: NgxSpinnerService,
    private vayaTrackerHelper : VayaTrackerHelper,
    private cdRef:ChangeDetectorRef
    
  ) { }

  ngOnInit(): void {

    //console.log(this.Device);


    if( this.Device.DeviceModel == DeviceModelType.Model_AdvancedCarTracker)
    {
      this.pointPassedMinutes = this.dateService.getPassedMinutes(this.Device.LastConnectionTime) ;

      if( this.pointPassedMinutes > 600)
      {
        this.cardTagClass = 'danger';
      }
      else if( this.pointPassedMinutes <= 600 && this.pointPassedMinutes>= 180)
      {
        this.cardTagClass = 'twarning';
      }
      else{
        this.cardTagClass = 'success';

      }


    }
    
  }

  ReGenerateTrackingLink(event:string)
  {
    this.ReGenerateLink.emit(event);
  }

}
