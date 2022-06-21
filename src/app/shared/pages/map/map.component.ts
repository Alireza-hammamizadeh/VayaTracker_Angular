import { Component, OnInit } from '@angular/core';
import { MapService } from 'src/app/core/services/common/map.service';


declare var $:any;
declare var document: any;


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  
  map: any;
  viewLatitude = 31.790591;
  viewLongitude = 54.311721;
  viewZoomLevel = 5;


  constructor(
    private mapService: MapService,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
     this.map = this.mapService.LoadMap();
    }, 750);
  }

   
  

}
