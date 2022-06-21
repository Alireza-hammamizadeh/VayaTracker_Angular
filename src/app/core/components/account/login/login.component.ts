import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RecaptchaErrorParameters } from 'ng-recaptcha';
import { NgxSpinnerService } from 'ngx-spinner';
import { LoginRequestDto } from 'src/app/core/models/Account/LoginRequestDto';
import { IResponseDtoCodes } from 'src/app/core/models/IResponseDto';
import { CurrentUserDto } from 'src/app/core/models/user/CurrentUserDto';
import { ToastService } from 'src/app/core/services/common/toast.service';
import { TranslatorService } from 'src/app/core/services/features/translator.service';
import { EncryptionService } from 'src/app/core/services/security/encryption.service';
import { AuthenticationService } from 'src/app/core/services/user/authentication.service';
import { ElementTools } from 'src/app/core/utilities/ElementTools';
import { GoogleRecaptchaSiteKey } from 'src/app/core/utilities/pathTools';


declare var $:any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  @ViewChild('mobileInput') mobileInput: Element | any;
  @ViewChild('captchaRef') recaptchaInput: Element | any;

  gRecaptchaSiteKey: string = GoogleRecaptchaSiteKey;

  form: any;
  returnUrl: string | null = '/';
  hidePassword: boolean=true;
  

  
  constructor(
    private authenticationService: AuthenticationService,
    private spinner: NgxSpinnerService,
    public translatorService: TranslatorService,
    private toastService: ToastService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private elementTools: ElementTools,
    private encryptionService:EncryptionService
  ) { 
    this.route.queryParamMap.subscribe(
      (params) => (this.returnUrl = params.get('url'))
    );
  }

  ngOnInit(): void {

    $("#Password-toggle a").on('click', function(event:any) {
      event.preventDefault();
      if ($('#Password-toggle input').attr("type") == "text") {
          $('#Password-toggle input').attr('type', 'password');
          $('#Password-toggle i').addClass("zmdi-eye");
          $('#Password-toggle i').removeClass("zmdi-eye-off");
      } else if ($('#Password-toggle input').attr("type") == "password") {
          $('#Password-toggle input').attr('type', 'text');
          $('#Password-toggle i').removeClass("zmdi-eye");
          $('#Password-toggle i').addClass("zmdi-eye-off");
      }
  });

  setTimeout(() => {
    this.spinner.hide();
  }, 100);
  this.form = this.formBuilder.group({
    Mobile: [
      null,
      {
        validators: [
          Validators.required,
          Validators.minLength(11),
          Validators.maxLength(11),
          Validators.pattern('^(09)?[0-9]{9}$'),
        ],
      },
    ],
    Password: [
      null,
      {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(40),
        ],
      },
    ],
    RememberMe: true,
  });

  setTimeout(() => {
    this.elementTools.setInputFilter(
      this.mobileInput.nativeElement,
      function (value) {
        return /^\d*\.?\d*$/.test(value); // Allow digits and '.' only, using a RegExp
      }
    );
    this.recaptchaInput.reset();
    this.elementTools.changeRecaptchaElementLanguage(
      this.translatorService.getCurrenLanguage()
    );
  }, 500);
  

  }

  ngOnDestroy(): void {
    try
    {
      const captchaElem = this.recaptchaInput['elementRef'].nativeElement;
      captchaElem.parentElement.removeChild(captchaElem);
    }
    catch
    {

    }
   
  }


  submitForm(reCaptcha: any) {
    this.spinner.show();
    reCaptcha.execute();
    this.toastService.RemoveAll();
    this.toastService.Info(
      '',
      this.translatorService.getStringFromJsonFile('Processing.ReacptchaCheck')
    );
  }

  public gRecaptchaResolved(captchaResponse: string, reCaptcha: any): void {
    if (captchaResponse != null) {
      //Reset Recaptcha
      reCaptcha.reset();

      //For Real Time Recaptcha Language Change
      this.elementTools.changeRecaptchaElementLanguage(
        this.translatorService.getCurrenLanguage()
      );

      //Remove Last Toast
      this.toastService.RemoveAll();
      this.toastService.Info(
        '',
        this.translatorService.getStringFromJsonFile(
          'Processing.SendingRequest'
        ),
        30000
      );
       //Fill Model
       this.authenticationService
       .loginUser(
         new LoginRequestDto(
           this.form.controls.Mobile.value,
           this.form.controls.Password.value,
           this.form.controls.RememberMe.value,
           captchaResponse
         )
       )
       .subscribe(
         (res)=>
         {
           try
           {
            var dec = this.encryptionService.Decrypt(res.x);
            let data = JSON.parse(dec);
            //console.log(data);
            if (data.IsSuccess == false) {
              if (data.StatusCode == IResponseDtoCodes.MobileNotConfirm) {
                this.toastService.RemoveAll();
                this.toastService.Error(
                  '',
                  this.translatorService.getStringFromJsonFile(
                    'Result.' + data.Message
                  ),2800
                );
                setTimeout(() => {
                  this.toastService.RemoveAll();
                  this.toastService.Info(
                    '',
                    this.translatorService.getStringFromJsonFile(
                      'Result.RedirectToMobileConfirm'
                    ),1800
                  );
                  setTimeout(() => {
                    this.spinner.hide();
                    this.router.navigate([
                      'mobileconfirmation',
                      { mobile: this.form.controls.Mobile.value },
                    ]);
                  }, 2000);
                }, 3000);
              }if (data.StatusCode == IResponseDtoCodes.AccountIsLocked) {
                this.toastService.RemoveAll();
                this.toastService.Error(
                  '',
                  this.translatorService.getStringFromJsonFile(
                    'Result.AccountIsLocked'  ,data.ExteraDetail
                  )
                );
                this.spinner.hide();
              } 
              else {
                this.toastService.RemoveAll();
                this.toastService.Error(
                  '',
                  this.translatorService.getStringFromJsonFile(
                    'Result.' + data.Message
                  )
                );
                this.spinner.hide();
              }
            } else {
              this.toastService.RemoveAll();
              this.toastService.Success(
                '',
                this.translatorService.getStringFromJsonFile(
                  'Result.' + data.Message
                ),1400
              );
              setTimeout(() => {
                if (this.returnUrl == null) {
                  this.toastService.RemoveAll();
                  this.toastService.Info(
                    '',
                    this.translatorService.getStringFromJsonFile(
                      'Result.RedirectToPanel'
                    ),
                    1400
                  );
                } else {
                  this.toastService.RemoveAll();
                  this.toastService.Info(
                    '',
                    this.translatorService.getStringFromJsonFile(
                      'Result.RedirectToPage'
                    ),1400
                  );
                }
                setTimeout(() => {
                  //console.log(data);
                  //Set Current User
                  this.authenticationService.setCurrenUser(
                    new CurrentUserDto(
                      data.Data.Token,
                      data.Data.FirstName,
                      data.Data.LastName,
                      data.Data.UserId,
                      data.Data.UserBalance,
                      data.Data.Mobile,
                      data.Data.Email,
                      data.Data.EmailIsConfirm,
                      data.Data.RegisterDate,
                      data.Data.UserPermissions,
                      data.Data.Devices,
                      data.Data.HaveNewNotification
                    ),
                    this.form.controls.RememberMe.value
                  );

                  setTimeout(() => {
                    this.toastService.RemoveAll();
                    this.spinner.hide();
                    if (this.returnUrl == null) {
                      this.router.navigate(['/panel/devices']);
                    } else {
                      this.router.navigate([this.returnUrl]);
                    }
                  }, 500);
                }, 1500);
              }, 1500);
            }
           }
           catch
           {
            this.toastService.RemoveAll();
            this.toastService.Error(
              '',
              this.translatorService.getStringFromJsonFile(
                'Result.UnknownError'
              )
            );
            this.spinner.hide();
           }
         },
         (error)=>
         {
          this.toastService.RemoveAll();
          this.toastService.Error(
            '',
            this.translatorService.getStringFromJsonFile(
              'Result.ConnectionError'
            )
          );
          this.spinner.hide();
         }
       );
       

      //  this.authenticationService.loginUser(new LoginRequestDto("09136198661","1234",false,"12315sa4d54as564d65as4d54as54d5a4sd54as654d65a4sd654as65d46a5s4d654asd65a")).subscribe(
      //   (data)=>
      //   {
      //     console.log(data);
      //     var dec = this.encryptionService.Decrypt(data.x);
      //     console.log(JSON.parse(dec));

      //   }
      //)
  
    }
  }

  public gRecaptchaOnError(
    errorDetails: RecaptchaErrorParameters,
    reCaptcha: any
  ): void {
    this.toastService.RemoveAll();
    this.toastService.Error(
      '',
      this.translatorService.getStringFromJsonFile('Processing.RecaptchaError')
    );
    this.spinner.hide();

    setTimeout(() => {
     //Reset Recaptcha
      reCaptcha.reset();
    }, 5000);
    
  }

  keyPreesEventInForm(reCaptcha: any) {
    if (this.form.valid) {
      this.submitForm(reCaptcha);
    }
  }
  
}
