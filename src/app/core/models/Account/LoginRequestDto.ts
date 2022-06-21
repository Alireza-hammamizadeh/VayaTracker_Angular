export class LoginRequestDto {
    constructor(
      public Mobile: string,
      public Password: string,
      public RememberMe : boolean,
      public RecaptchaResponse: string
    ) {}
  }
  