 
import { Injectable, NgZone } from '@angular/core';
 
 


declare var L: any;
declare var $: any;
declare var document: any;

let mapHolderDiv = '';
let mapDiv = '';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  mapMarkers: any = null;

  mapLayer: string = 'googleStreet';
  map: any = null;
 

  
  NewMarker: any = L.icon({
    iconUrl: '/assets/leaflet/images/marker-here.png',
    iconSize: [36, 108],
    iconAnchor: [18, 54],
    popupAnchor: [0, 0],
  });


 
 

  // specify popup options
  customOptions = {
    className: 'popupCustom',
    closeButton: true,
  };

  constructor(
    private zone: NgZone,
 
    // private translatorService: TranslatorService,
    // private dateService: DateConverterService
  ) {
    //Chek Map Layer
    this.mapLayer = localStorage.getItem('VayaTracker_MapLayer') + '';
    //console.log(this.mapLayer );
    if (this.mapLayer.length == 0) {
      localStorage.setItem('VayaTracker_MapLayer', 'googleStreet');
      this.mapLayer = 'googleStreet';
    } else if (
      this.mapLayer != 'googleStreet' &&
      this.mapLayer != 'googleSatellite' &&
      this.mapLayer != 'googleTraffic' &&
      this.mapLayer != 'openStreetMap' &&
      this.mapLayer != 'osmStreets'  
    ) {
      localStorage.setItem('VayaTracker_MapLayer', 'googleStreet');
      this.mapLayer = 'googleStreet';
    }

    setTimeout(() => {
      $('.app-sidebar__toggle').on('click', () => {
        setTimeout(() => {
          configMapContainerSize();
        }, 750);
      });
    }, 500);
  }

  ReinitMapSize()
  {
    configMapContainerSize();
  }

  LoadMap(
    latitude: number = 32.790591,
    longitude: number = 53.311721,
    zoom: number = 5,
    changeView: boolean = true,
    mapId: string = 'myMap',
    mapContainerId: string = 'myMapHolder',
    rotateEn: boolean = true
  ): any {
    this.zone.runOutsideAngular(() => {
      mapDiv = mapId;
      mapHolderDiv = mapContainerId;
      configMapContainerSize();
      window.addEventListener(
        'resize',
        function (event: any) {
          setTimeout(() => {
            configMapContainerSize();
          }, 100);
        },
        true
      );

      //Todo Copy Map Info
      if (changeView == false) {
        if (this.map != null) {
          zoom = this.map.getZoom();
          console.log('ToDO Get Current Info');
        }
      }
      //Reset Map
      if (this.map) {
        this.map.off();
        this.map.remove();
      }

      this.map = null;
      const CopyRight =
        '';

      //https://leaflet-extras.github.io/leaflet-providers/preview/
      const googleStreet = L.tileLayer(
        'https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
        {
          maxZoom: 22,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: CopyRight,
          layoutLabel: 'googleStreet',
        }
      );
      const googleSatellite = L.tileLayer(
        'https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        {
          maxZoom: 21,
          subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
          attribution: CopyRight,
          layoutLabel: 'googleSatellite',
        }
      );
      const googleTraffic = L.tileLayer(
        'https://{s}.google.com/vt/lyrs=m@221097413,traffic&x={x}&y={y}&z={z}',
       {
        maxZoom: 20,
        minZoom: 2,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
        layoutLabel: 'googleTraffic',
       }
       );
      const openStreetMap = L.tileLayer(
        'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
        {
          maxZoom: 19,
          attribution: CopyRight,
          layoutLabel: 'openStreetMap',
        }
      );
      const osmStreets = L.tileLayer(
        'https://{s}.tile.osm.org/{z}/{x}/{y}.png',
        {
          attribution: CopyRight,
          maxZoom: 19,
          layoutLabel: 'osmStreets',
        }
      );
      this.map = new L.map(mapId, {
        rotate: rotateEn,
        center: [latitude, longitude],
        zoom: zoom,
        contextmenu: rotateEn,
        touchRotate: rotateEn,
        rotateControl: {
          closeOnZeroBearing: false,
        },
        bearing: 0,
        'messagebox': true
      });
      const baseLayer = {
        'Google Satellite': googleSatellite,
        'Google Street': googleStreet,
        'Google Traffic':googleTraffic,
        'Open Street': openStreetMap,
        'OSM': osmStreets
      };
      //Set User Defualt Layout
      if (this.mapLayer == 'googleStreet') {
        googleStreet.addTo(this.map);
      } else if (this.mapLayer == 'googleSatellite') {
        googleSatellite.addTo(this.map);
      }  else if (this.mapLayer == 'googleTraffic') {
        googleTraffic.addTo(this.map);
      } else if (this.mapLayer == 'openStreetMap') {
        openStreetMap.addTo(this.map);
      } else if (this.mapLayer == 'osmStreets') {
        osmStreets.addTo(this.map);
      } else {
        googleStreet.addTo(this.map);
      }
      this.map.zoomControl.setPosition('bottomleft');
      this.map.on('baselayerchange', (e: any) => {
        this.mapLayer = e.layer.options.layoutLabel;
        localStorage.setItem('VayaTracker_MapLayer', this.mapLayer);
      });
      L.control
        .layers(baseLayer, undefined, { position: 'bottomright' })
        .addTo(this.map);
      this.map.on('rotate', () => {
        //Chek Icons
        this.map.eachLayer((layer: any) => {
          if (layer.options.rotationAngle != null) {
            layer.options.rotationAngle =
              this.map._bearing / 0.0174533 + layer.options.mainAngle;
          }
        });
      });
    });
    this.map.attributionControl.setPrefix('');

    return this.map;
  }

  RemoveMarkers() {
    this.zone.runOutsideAngular(() => {
      if (this.mapMarkers != null) {
        this.map.removeLayer(this.mapMarkers);
        this.mapMarkers = null;
      }
    });
  }

  AddMarker(markerInfo: any, option: any, deletLast = true):any {
    let iconNumber = option.icon;

    option.icon=this.NewMarker;
    option.icon.options.iconUrl= '/assets/icons/car/' +iconNumber+'.png';
 
    this.zone.runOutsideAngular(() => {
      if (deletLast) {
        this.RemoveMarkers();
      }
      this.mapMarkers = L.marker(markerInfo, option).addTo(this.map);
      this.mapMarkers.dragging.disable();


      //Chek Icons
      this.map.eachLayer((layer: any) => {
        if (layer.options.rotationAngle != null) {
          layer.options.rotationAngle =
            this.map._bearing / 0.0174533 + layer.options.mainAngle;
         }
      });

    });
    
    return this.mapMarkers;
  }
  GetMapMarkers(): any {
    return this.mapMarkers;
  }


  SetView(latlon: any, zoom: number) {
    this.zone.runOutsideAngular(() => {
      this.map.setView(latlon, zoom);
    });
  }
  SetHeadAngle(angle: number) {
    this.zone.runOutsideAngular(() => {
      this.map.setBearing(angle);
    });
  }
  FlyTo(latlon: any, zoom: number) {
    this.zone.runOutsideAngular(() => {
      this.map.flyTo(latlon, zoom);
    });
  }
  GetZoom(): number {
    let ret = 0;
    this.zone.runOutsideAngular(() => {
      ret = this.map.getZoom();
    });
    return ret;
  }
  GetMaxZoom(): number {
    let ret = 0;
    this.zone.runOutsideAngular(() => {
      ret = this.map.getMaxZoom();
    });
    return ret;
  }

  AddCircle(circleInfo: any, option: any) {
    this.zone.runOutsideAngular(() => {
      L.circle(circleInfo, option).addTo(this.map);
    });
  }

  AddPolyline(points: any, option: any): any {
    var ret = null;
    this.zone.runOutsideAngular(() => {
      ret = L.polyline(points, option).addTo(this.map);
    });
    return ret;
  }

  AddPolylineDecorator(points: any, option: any) {
    this.zone.runOutsideAngular(() => {
      L.polylineDecorator(points, option).addTo(this.map);
    });
  }

  SetViewAreaOnPoints(points: any) {
    this.zone.runOutsideAngular(() => {
      const markersBounds = L.latLngBounds([
        points[0].Latitude,
        points[0].Longitude,
      ]);
      points.forEach((marker: any) => {
      
        markersBounds.extend([marker.Latitude, marker.Longitude]);
      });
      // Fit the map with the visible markers bounds
      this.map.flyToBounds(markersBounds, {
        padding: L.point(40, 40),
        animate: false,
      });
    });
  }
 
 

}

function configMapContainerSize() {
  
  var offset = $(`#${mapHolderDiv}`).offset();
 
  if (offset != undefined) {

    let mapDivWidth = document.getElementById(`${mapHolderDiv}`).clientWidth;
    let mapDivHeight = $(window).height() - (offset.top + 41);
    if( mapDivHeight < 300)
    {
      mapDivHeight = 300;
    }
    $(`#${mapDiv}`).css('width', mapDivWidth + 'px');
    $(`#${mapDiv}`).css('height', mapDivHeight + 'px');


  }
}
