import { formatDate } from '@angular/common';
import { Injectable } from '@angular/core';
 
 import * as moment from 'moment-jalaali';

 
import { TranslatorService } from '../features/translator.service';


 

@Injectable({
  providedIn: 'root'
})
export class DateConverterService {

  constructor(
    private translatorService : TranslatorService
  ) { }

  getDateString(date:Date , showSecond:boolean = true) : string
  {

    if( this.translatorService.getCurrenLanguage() == 'fa')
    {
      let str='';
       
      if( showSecond)
      {
        return moment(date).format('HH:mm:ss jYYYY/jMM/jDD');
      }
      else 
      {
        return moment(date).format('HH:mm jYYYY/jMM/jDD');
      }
    }
    if( showSecond)
    {
      return formatDate(date,'yyyy/MM/dd  HH:mm:ss','en-us',"UTC+00:00"); 
    }
    else 
    {
      return formatDate(date,'yyyy/MM/dd  HH:mm','en-us',"UTC+00:00"); 
    }
  }

  Now(showSecond:boolean = true):string 
  {
    if( this.translatorService.getCurrenLanguage() == 'fa')
    {
      if( showSecond)
      {
        return moment((new Date())).format('HH:mm:ss jYYYY/jMM/jDD');
      }
      else
      {
        return moment((new Date())).format('HH:mm jYYYY/jMM/jDD');
      }
    }
    if( showSecond)
    {
      return formatDate(Date.now(),'yyyy/MM/dd  HH:mm:ss','en-us',"UTC+00:00"); 
    }
    else
    {
      return formatDate(Date.now(),'yyyy/MM/dd  HH:mm','en-us',"UTC+00:00"); 
    }
  }

  getPassedDateTime(date:Date , tuc:boolean = false):string
  {
    let pointDate = Math.trunc(new Date(date).getTime() / 1000);
    let now ;
    if( tuc == false)
    {
      now = new Date().getTime() / 1000;
    }
    else
    {
      now = new Date().getUTCMilliseconds() / 1000;
    }
   
    if (now > pointDate) {
      let dif =  Math.trunc(now - pointDate);

      if( dif < 60 )
      {
        return this.translatorService.getStringFromJsonFile("Labels.MomentsAgo");

        // return dif + ' ' +this.translatorService.getStringFromJsonFile("Labels.SecondsAgo");
      }
      else{
        dif = dif / 60 ;
        if( dif < 240)
        {
          return  Math.trunc(dif ) + ' '+   this.translatorService.getStringFromJsonFile("Labels.MinutesAgo");
        }
        else if( dif < 1440)
        {
          return Math.trunc(dif / 60 )+ ' ' +  this.translatorService.getStringFromJsonFile("Labels.HoursAgo");
        }
        else if(dif < 43200)
        {
          return Math.trunc(dif / 1440 ) + ' '+  this.translatorService.getStringFromJsonFile("Labels.DaysAgo");
        }
        else if(dif <= 525600)
        {
          return Math.trunc(dif / 43200 ) + ' '+  this.translatorService.getStringFromJsonFile("Labels.MonthsAgo");
        }

        return Math.trunc(dif / 525600 ) + ' '+  this.translatorService.getStringFromJsonFile("Labels.YearsAgo");
    }
    } else {
      return this.translatorService.getStringFromJsonFile("Labels.MomentsAgo");
    }
  }
  getPassedMinutes(date:Date) : number
  {
    let now = new Date();
    let finish = new Date(date);
    let Difference_In_Time = now.getTime() - finish.getTime();
    if (Difference_In_Time < 0) {
      return -1;
    }
    let Difference_In_Days = Difference_In_Time / 60000;
    return Math.round(Difference_In_Days);
  }

  getPassedDays(date:Date) : number
  {
    let now = new Date();
    let finish = new Date(date);
    let Difference_In_Time = now.getTime() - finish.getTime();
    if (Difference_In_Time < 0) {
      return -1;
    }
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.round(Difference_In_Days);
  }

  getRemainingdDays(date:Date) : number
  {
    let now = new Date();
    let finish = new Date(date);
    let Difference_In_Time = finish.getTime() - now.getTime() ;
    if (Difference_In_Time < 0) {
      return -1;
    }
    let Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
    return Math.round(Difference_In_Days);
  }


  convertSecondsToTimeString(input:number): string
  {
    return '';
  }
   


}
