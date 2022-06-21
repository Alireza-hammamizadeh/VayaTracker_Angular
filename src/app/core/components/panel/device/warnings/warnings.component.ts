import { Component, Input, OnInit } from '@angular/core';
import { PanelDevicesListItem } from 'src/app/core/models/Panel/PanelDevicesListDto';

@Component({
  selector: 'app-warnings',
  templateUrl: './warnings.component.html',
  styleUrls: ['./warnings.component.scss']
})
export class WarningsComponent implements OnInit {

    
  //Device Model
  @Input('Device') public Device!: PanelDevicesListItem;
  
  constructor() { }

  ngOnInit(): void {
  }

}
