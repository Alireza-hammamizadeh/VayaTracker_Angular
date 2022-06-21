import { environment } from "src/environments/environment";


export const DomainName = environment.production ? 'https://backend.vayatracker.com' : 'https://localhost:7040';


export const GoogleRecaptchaSiteKey = environment.production ? '6LdCil4fAAAAAJm6V21pYQrOPd-Xf8RNfJEzaz1l' : '6Lfkd1oaAAAAAAlUKQqMiPLlXAT-xCKIUnchHlNS';

let langaugeRecaptcha ='fa';
function GetRecaptchaLanguage() : string
{
    return langaugeRecaptcha;
}
function SetRecaptchaLanguage(lan:string)
{
    if(lan=='en')
    {
        langaugeRecaptcha = 'en';
    }
    else
    {
        langaugeRecaptcha = 'fa';
    }
}
   
export { GetRecaptchaLanguage as GetRecaptchaLanguage }
export { SetRecaptchaLanguage as SetRecaptchaLanguage }

 