export enum IResponseDtoCodes {
    NoError = 1,
    UnknownError,
    NotAuthenticated,
    NoPermission,
    ConnectionError,
    InvalidInputData,
  
    RecaptchaIsInvalid,
    RecaptchaResultError,
    FirstNameIsInvalid,
    LastNameIsInvalid,
    MobileIsInvalid,
    PasswordIsInvalid,
    NewPasswordIsInvalid,
    RePasswordIsInvalid,
    OldPasswordIsInvalid,
    EmailIsInvalid,
    WrongPassword,
  
  
    CodeIsInvalid,
    CodeIsWrong,
    EmailIsConfirm,
    MobileIsConfirm,
    MobileNotConfirm,
    ConfirmCodeSended,
    ConfirmCompelete,
    RegisterCompelete,
    LoginCompelete,
    PasswordChangeCompelete,
    EmailConfirmCompelete,
    InformationUpdated,
  
    AccountNotActived,
    AccountIsDeactive,
    AccountIsLocked,
  
    CodeSendedTo,
    ConfirmEmailSend,
  
  
    NameIsInvalid,
    NameIsExist,
  
    ModemSerialIsExist,
  
  
    EmailIsExist,
    MobileIsExist,
    MobileNotExist,
    EmailNotExist,
  
    RedirectToMobileConfirm,
    RedirectToLogin,
    RedirectToPanel,
    RedirectToPage,
  
  
    //USer Panel 
    DeviceNotFound,
    DeviceHaveOwner,
    DeviceAddedCompelete,
    DeviceNameExist,
    DeviceSerialIsInvalid,
    DeviceNameIsInvalid,
    DeviceDontHaveAnyPoint,
  
    ActionCompleted,
  
  
    //Version
    VersionExist,
    VersionNotExist,
    FileNotFound,
    MaximumCountIs
  
    }
  
  
    export interface IResponseDto<T> {
      IsSuccess: Boolean;
      Message :string;
      StatusCode :IResponseDtoCodes; 
      Data: T;
      ExteraDetail : string;
    }
  
   
    