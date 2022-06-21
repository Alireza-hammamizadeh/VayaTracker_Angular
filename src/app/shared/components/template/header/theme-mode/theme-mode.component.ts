import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/core/services/features/theme.service';


declare var $:any;


@Component({
  selector: 'app-theme-mode',
  templateUrl: './theme-mode.component.html',
  styleUrls: ['./theme-mode.component.scss']
})
export class ThemeModeComponent implements OnInit {

themeMode:string='';

  constructor(
    private themeService : ThemeService
  ) {
       this.themeService.initTheme();
       this.themeMode = this.themeService.currentMode();
   }

  ngOnInit(): void {
      setTimeout(() => {
        $('.layout-settingMode').on("click", () => {

          //console.log(this.themeService.currentMode());
          
          if( this.themeService.currentMode() ==='light-mode')
          {
            this.themeService.update('dark-mode');
          }
          else if( this.themeService.currentMode() ==='dark-mode')
          {
            this.themeService.update('transparent-mode');
          }
          else if( this.themeService.currentMode() ==='transparent-mode')
          {
            this.themeService.update('light-mode');
          }
          this.themeMode = this.themeService.currentMode();
        });
    }, 100);
  }
}
