export class RegisterRequestDto {
    constructor(
      public FirstName: string,
      public LastName: string,
      public Mobile: string,
      public Password: string,
      public RecaptchaResponse: string
    ) {}
  }
  