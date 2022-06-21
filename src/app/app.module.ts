import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/components/template/header/header.component';
import { FooterComponent } from './shared/components/template/footer/footer.component';
import { MenuComponent } from './shared/components/template/menu/menu.component';
import { LanguageSelectorComponent } from './shared/components/template/header/language-selector/language-selector.component';
import { ThemeModeComponent } from './shared/components/template/header/theme-mode/theme-mode.component';
import { ShopingCartComponent } from './shared/components/template/header/shoping-cart/shoping-cart.component';
import { NotificationsBoxComponent } from './shared/components/template/header/notifications-box/notifications-box.component';
import { MessagesBoxComponent } from './shared/components/template/header/messages-box/messages-box.component';
import { ProfileBoxComponent } from './shared/components/template/header/profile-box/profile-box.component';
import { LanguageSelectorModalComponent } from './shared/components/template/header/language-selector/language-selector-modal/language-selector-modal.component';
import { SliderComponent } from './shared/components/template/slider/slider.component';
import { SliderContentComponent } from './shared/components/template/slider/slider-content/slider-content.component';
import { MapComponent } from './shared/pages/map/map.component';






//translator
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


export function rootLoaderFactory(http:HttpClient)
{
  return new TranslateHttpLoader(http,'assets/i18n/','.json');
}

//For Notifications
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ToastService } from './core/services/common/toast.service';
//For PrerLoading
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// the scanner!
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { QRCodeModule  } from 'angular2-qrcode';
import { CircleTimerModule } from '@flxng/circle-timer';
import { ClipboardModule } from 'ngx-clipboard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgPersianDatepickerModule } from 'ng-persian-datepicker';
import { RecaptchaModule, RECAPTCHA_LANGUAGE } from 'ng-recaptcha';
import { UrlSerializer } from '@angular/router';
import { LowerCaseUrlSerializer } from './core/utilities/LowerCaseUrlSerializer';
import { GetRecaptchaLanguage } from './core/utilities/pathTools';
import { vayaTrackerInterceptor } from './core/interceptor/VayaTrackerInterceptor';
import { DevicesComponent } from './core/components/panel/devices/devices.component';
import { AddDeviceComponent } from './core/components/panel/add-device/add-device.component';
import { DeleteDeviceComponent } from './core/components/panel/delete-device/delete-device.component';
import { DeletePointsComponent } from './core/components/panel/delete-points/delete-points.component';
import { MessagesComponent } from './core/components/panel/messages/messages.component';
import { DeviceItemComponent } from './core/components/panel/devices/device-item/device-item.component';
import { DeviceComponent } from './core/components/panel/device/device.component';
import { TrackingComponent } from './core/components/panel/device/tracking/tracking.component';
import { StatusComponent } from './core/components/panel/device/status/status.component';
import { SettingsComponent } from './core/components/panel/device/settings/settings.component';
import { WarningsComponent } from './core/components/panel/device/warnings/warnings.component';
import { LoginComponent } from './core/components/account/login/login.component';
import { RegisterComponent } from './core/components/account/register/register.component';
import { AccountsettingsComponent } from './core/components/account/accountsettings/accountsettings.component';
import { EmailconfirmationComponent } from './core/components/account/emailconfirmation/emailconfirmation.component';
import { MobileconfirmationComponent } from './core/components/account/mobileconfirmation/mobileconfirmation.component';
import { ForgotpasswordComponent } from './core/components/account/forgotpassword/forgotpassword.component';
 


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    MenuComponent,
    LanguageSelectorComponent,
    ThemeModeComponent,
    ShopingCartComponent,
    NotificationsBoxComponent,
    MessagesBoxComponent,
    ProfileBoxComponent,
    LanguageSelectorModalComponent,
    SliderComponent,
    SliderContentComponent,
    MapComponent,
    DevicesComponent,
    AddDeviceComponent,
    DeleteDeviceComponent,
    DeletePointsComponent,
    MessagesComponent,
    DeviceItemComponent,
    DeviceComponent,
    TrackingComponent,
    StatusComponent,
    SettingsComponent,
    WarningsComponent,
    LoginComponent,
    RegisterComponent,
    AccountsettingsComponent,
    EmailconfirmationComponent,
    MobileconfirmationComponent,
    ForgotpasswordComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
     //translator
     HttpClientModule,
     TranslateModule.forRoot({
       loader:{
         provide:TranslateLoader,
         useFactory:rootLoaderFactory,
         deps:[HttpClient]
       }}),


       FormsModule,
       ReactiveFormsModule,
 
       NgxSpinnerModule,
       SnotifyModule,
  
       RecaptchaModule,
       CircleTimerModule   ,
       ClipboardModule,
       ZXingScannerModule,

       NgPersianDatepickerModule,
       QRCodeModule 
  ],
  providers: [
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer,
    },
    {
      provide: RECAPTCHA_LANGUAGE,
      useFactory: (locale: string) => GetRecaptchaLanguage()
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: vayaTrackerInterceptor,
      multi: true,
    },
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults },
    SnotifyService,
    ToastService,
    ClipboardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
