import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';



declare var $:any;
@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private renderer: Renderer2;
  private colorTheme: string ='light-mode';

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }


  initTheme() {
    this.getColorTheme();
 
    $('body').removeClass('light-mode');
    $('body').removeClass('transparent-mode');
    $('body').removeClass('dark-mode');
 
    $('body').addClass(this.colorTheme);
  }

  update(theme: 'dark-mode' | 'light-mode' | 'transparent-mode') {
    this.setColorTheme(theme);
 
    $('body').removeClass('light-mode');
    $('body').removeClass('transparent-mode');
    $('body').removeClass('dark-mode');
 
    $('body').addClass(theme);
  }

  isDarkMode() {
    return this.colorTheme === 'dark-mode';
  }

  currentMode() {
    return this.colorTheme ;
  }

  private setColorTheme(theme:string) {
    this.colorTheme = theme;
    localStorage.setItem('user-theme', theme);
  }

  private getColorTheme() {
    if (localStorage.getItem('user-theme')) {
      this.colorTheme = localStorage.getItem('user-theme') +'';
    } else {
      this.colorTheme = 'light-mode';
    }
  }

}
