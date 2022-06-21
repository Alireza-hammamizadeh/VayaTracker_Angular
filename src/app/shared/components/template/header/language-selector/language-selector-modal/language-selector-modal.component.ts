import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { TranslatorService } from 'src/app/core/services/features/translator.service';
import { ElementTools } from 'src/app/core/utilities/ElementTools';
import { SetRecaptchaLanguage } from 'src/app/core/utilities/pathTools';
 

declare var $ : any;

@Component({
  selector: 'app-language-selector-modal',
  templateUrl: './language-selector-modal.component.html',
  styleUrls: ['./language-selector-modal.component.scss']
})
export class LanguageSelectorModalComponent implements OnInit {


  
 
  currentLanguage:string='en';

  constructor(
    private translatorService: TranslatorService,
    private toastService: ToastService,
    private elementTools: ElementTools,
    private router: Router,
 
  ) { }

  ngOnInit(): void {

 
    

    setTimeout(() => {
     
      this.translatorService.initTranslator();
      this.currentLanguage = this.translatorService.getCurrenLanguage();
      this.setLan( this.currentLanguage);
      
        this.currentLanguage = this.translatorService.getCurrenLanguage();
        this.setLan( this.currentLanguage);
    }, 250);
  }

  setLan(lan:string)
  {

    this.toastService.RemoveAll();
 
    SetRecaptchaLanguage(lan);
    this.translatorService.changeLanguage(lan);
 
    if( lan=='fa')
    {
      document.body.classList.remove('ltr');
      document.body.classList.remove('rtl');
      
      document.body.classList.add('rtl');
      document.documentElement.setAttribute('lang', lan);
      document.documentElement.setAttribute('dir', 'rtl');
    }
    else
    {
      document.body.classList.remove('ltr');
      document.body.classList.remove('rtl');

      document.body.classList.add('ltr');
      document.documentElement.setAttribute('lang', lan);
      document.documentElement.setAttribute('dir', 'ltr');
    }

    this.currentLanguage = this.translatorService.getCurrenLanguage();
 
    setTimeout(() => {
      //For Real Time Recaptcha Language Change
      this.elementTools.changeRecaptchaElementLanguage(this.currentLanguage);
      
    }, 250);

    $('#country-selector').modal('hide');
  }

 
  
}
