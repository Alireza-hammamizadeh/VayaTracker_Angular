import { Component, Input, OnInit } from '@angular/core';
import { PanelDevicesListItem } from 'src/app/core/models/Panel/PanelDevicesListDto';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

    
  //Device Model
  @Input('Device') public Device!: PanelDevicesListItem;
  
  constructor() { }

  ngOnInit(): void {
  }

}
