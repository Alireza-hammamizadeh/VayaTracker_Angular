import { Injectable } from '@angular/core';
import {
  SnotifyPosition,
  SnotifyService,
  SnotifyToastConfig,
} from 'ng-snotify';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  style = 'material';
  title = 'Snotify title!';
  body = 'Lorem ipsum dolor sit amet!';
  timeout = 5000;
  position: SnotifyPosition = SnotifyPosition.centerTop;
  progressBar = true;
  closeClick = true;
  newTop = true;
  filterDuplicates = false;
  backdrop = -1;
  dockMax = 8;
  blockMax = 6;
  pauseHover = false;
  titleMaxLength = 15; 
  bodyMaxLength = 80;

  isDarkThemeActive = false;
  isFullScreenActive = false;

  constructor(
    private snotifyService: SnotifyService
    ) {}

  Success(title: string, Message: string, Time = 5000): void {
    this.timeout = Time;
    this.snotifyService.success(Message, title, this.getConfig());
  }
  Error(title: string, Message: string, Time = 5000): void {
    this.timeout = Time;
    this.snotifyService.error(Message, title, this.getConfig());
  }
  Info(title: string, Message: string, Time = 5000): void {
    this.timeout = Time;
    this.snotifyService.info(Message, title, this.getConfig());
  }
  Warning(title: string, Message: string, Time = 5000): void {
    this.timeout = Time;
    this.snotifyService.warning(Message, title, this.getConfig());
  }
  RemoveAll() {
    this.snotifyService.clear();
  }

  GetService(): SnotifyService {
    return this.snotifyService;
  }

  private getConfig(): SnotifyToastConfig {
    this.snotifyService.setDefaults({
      global: {
        newOnTop: this.newTop,
        maxAtPosition: this.blockMax,
        maxOnScreen: this.dockMax,
        // @ts-ignore
        filterDuplicates: this.filterDuplicates,
      },
    });
    return {
      bodyMaxLength: this.bodyMaxLength,
      titleMaxLength: this.titleMaxLength,
      backdrop: this.backdrop,
      position: this.position,
      timeout: this.timeout,
      showProgressBar: this.progressBar,
      closeOnClick: this.closeClick,
      pauseOnHover: this.pauseHover,
    };
  }
}
