import { Component, Input, OnChanges, OnInit, SimpleChanges, OnDestroy } from '@angular/core';
import { DeviceModelType } from 'src/app/core/models/Devices/IDeviceMoldelType';
import { PanelDevicesListItem } from 'src/app/core/models/Panel/PanelDevicesListDto';
import { DateConverterService } from 'src/app/core/services/common/dateconverter.service';
import { MapService } from 'src/app/core/services/common/map.service';
import { TranslatorService } from 'src/app/core/services/features/translator.service';
import { VayaTrackerHelper } from 'src/app/core/utilities/VayaTrackerHelper';


declare var L:any;
declare var $:any;

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.component.html',
  styleUrls: ['./tracking.component.scss']
})
export class TrackingComponent implements OnInit,OnChanges,OnDestroy   {

  
  //Device Model
  @Input('Device') public Device!: PanelDevicesListItem ;

  map: any;
  viewLatitude = 31.790591;
  viewLongitude = 54.311721;
  viewZoomLevel = 5;
  lastPointHead = 0;
  mapMarker: any = null;
 
  pointDateTime:string='';

  pointPassedMinutes:number=0;
  serviceReminderValue:number=0;
 
  currentPoint:any;
  AlarmSettings : any;
  ConditionalAlerts:any;
  DeviceSettings : any;

  ShowPopUpInfo: boolean = true;
  RecenterMap: boolean = true;



  change!:SimpleChanges;

  constructor(
    private mapService: MapService,
    private translatorService: TranslatorService,
    public dateService: DateConverterService,
    public vayaTrackerHelper : VayaTrackerHelper
  ) { }

  ngOnDestroy(): void {
    $("#tabTracking").prop("onclick", null).off("click");
  }
  ngOnInit(): void {
    this.translatorService.getActiveLanguage().subscribe((res)=>
    {
      setTimeout(() => {
      this.ngOnChanges(this.change);
      }, 500);
    });
 
    $('#tabTracking').click(()=> {
      this.ngOnChanges(this.change);
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
      this.change = changes;
      if( this.map == null)
      {
        setTimeout(() => {
          this.map = this.mapService.LoadMap();
          this.doChangeDeviceAction();
        }, 250);
      }
      else
      {
        this.map = this.mapService.LoadMap();
        this.doChangeDeviceAction();
      }
  }


  doChangeDeviceAction()
  {
    this.RecenterMap = true;
    this.ShowPopUpInfo = true;


    if( this.Device != undefined)
    {
      if( this.Device.DeviceModel == DeviceModelType.Model_AdvancedCarTracker)
      {

       
        this.currentPoint = JSON.parse(this.Device.LastPointData);
        this.AlarmSettings = JSON.parse(this.Device.AlarmSettings);
        this.ConditionalAlerts = JSON.parse(this.Device.ConditionalAlerts);
        this.DeviceSettings = JSON.parse(this.Device.DeviceSettings);


        //car service Reminder
        this.serviceReminderValue = Math.round(this.AlarmSettings.CarServiceReminderDistance );

        //console.log(this.AlarmSettings);

        if(this.currentPoint != null && this.currentPoint != undefined )
        {
    
         if(this.currentPoint.SatalitesInView > 3)
         {

          L.easyButton('fa-map-marker', () =>
          {
            this.setPointOnCenter();
          }).addTo( this.map);

          L.easyButton('fa-mail-forward', () =>
           {
             window.open("https://www.google.com/maps/dir/?api=1&destination=" + this.currentPoint.Latitude + "," + this.currentPoint.Longitude ,  "_blank");
           }).addTo( this.map);

          L.easyButton('fa-share-alt', function()
           {
            console.log('share Location');
           }).addTo( this.map);

      

           if (this.currentPoint.IsMoving) {
            this.mapMarker = this.mapService.AddMarker(
              [this.currentPoint.Latitude, this.currentPoint.Longitude],
              {
                icon: this.Device.Icon,
                rotationAngle: this.currentPoint.Direction,
                mainAngle: this.currentPoint.Direction,
              }
            );
            this.lastPointHead = 360 - this.currentPoint.Direction;
          } else {
            this.mapMarker = this.mapService.AddMarker(
              [this.currentPoint.Latitude, this.currentPoint.Longitude],
              {
                icon:0,
                rotationAngle:this.lastPointHead,
                mainAngle:this.lastPointHead,
              }
            );
            this.lastPointHead = 360 - this.currentPoint.Direction;
          }
          this.mapService.SetHeadAngle(this.lastPointHead);

          if(this.RecenterMap)
          {
            //Chek FOr Defult zoom
            if (this.mapService.GetZoom() != 5) 
            {
              this.mapService.SetView(
                [this.currentPoint.Latitude, this.currentPoint.Longitude],
                this.viewZoomLevel
              );
            }
            else
            {
              this.mapService.SetView(
                [this.currentPoint.Latitude, this.currentPoint.Longitude],
                15
              );
            }
          }
 
         }

         // console.log(this.currentPoint);

          this.pointPassedMinutes = this.dateService.getPassedMinutes(this.currentPoint.UTC) ;
          
          if(this.pointPassedMinutes > 1500 )
          {
            this.pointDateTime = this.dateService.getDateString(this.currentPoint.UTC,true)
          }
          else
          {
            this.pointDateTime = this.dateService.getPassedDateTime(this.currentPoint.UTC);
          }
        }
      }
    }
  }

  setPointOnCenter(changezool:boolean=false) {
    if(changezool == false)
    {
      this.viewZoomLevel = this.mapService.GetZoom();
    }
    else
    {
      this.viewZoomLevel = 15;
    }
    
    this.mapService.FlyTo(
      [this.currentPoint.Latitude, this.currentPoint.Longitude],
      this.viewZoomLevel
    );
  }
  

}
