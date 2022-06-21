import { Component, Input, OnInit } from '@angular/core';
import { PanelDevicesListItem } from 'src/app/core/models/Panel/PanelDevicesListDto';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

    
  //Device Model
  @Input('Device') public Device!: PanelDevicesListItem;
  
  constructor() { }

  ngOnInit(): void {

  }

}
