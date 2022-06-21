import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})



export class TranslatorService {


  private currenLanguage: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private selectedLan:string='fa';

  constructor(private translateService: TranslateService) {
    
  }


  
  initTranslator() {
    if((localStorage.getItem('user-language') +'')==='en')
    {
      this.translateService.use('en');
      this.changeLanguage('en');
    } 
    else
    {
      this.translateService.use('fa');
      this.changeLanguage('fa');
    }
  }


  changeLanguage(type: string) {

    if (type.toLowerCase() == 'en') {
      this.translateService.use('en');
      this.selectedLan = 'en';
      this.currenLanguage.next('en');
    }
    //Chek Other Lanuage
    //Defult
    else {
      this.translateService.use('fa');
      this.selectedLan = 'fa';
      this.currenLanguage.next('fa');
    }
    localStorage.setItem('user-language', type);
  }

  getActiveLanguage():Observable<string>
  {
    return this.currenLanguage;
  }

  getCurrenLanguage(): string {
    return this.selectedLan;
  }

  getStringFromJsonFile(key:string,value1='',value2='',value3=''):string
  {
    let retValue='';
    if( value3.length  > 0 )
    {
      this.translateService
      .get(key, {
        value1: this.translateService.instant(value1),
        value2: this.translateService.instant(value2),
        value3: this.translateService.instant(value3)
      })
      .subscribe((res: string) => {
        retValue  = res;
      });
    }
    else if( value2.length  > 0 )
    {
      this.translateService
      .get(key, {
        value1: this.translateService.instant(value1),
        value2: this.translateService.instant(value2),
      })
      .subscribe((res: string) => {
        retValue  = res;
      });
    }
    else if( value1.length  > 0 )
    {
      this.translateService
      .get(key, {
        value1: this.translateService.instant(value1),
      })
      .subscribe((res: string) => {
        retValue  = res;
      });
    }
   else{
    retValue = this.translateService.instant(key);
   }


    return  retValue;
  }
  


}
