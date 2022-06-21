export class ForgotPasswordRequestDto {
    constructor(
      public Mobile: string,
      public Code: string,
      public Password: string,
      public RecaptchaResponse: string
    ) {}
  }