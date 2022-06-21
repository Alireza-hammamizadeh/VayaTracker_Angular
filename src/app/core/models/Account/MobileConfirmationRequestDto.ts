export class MobileConfirmationRequestDto {
    constructor(
      public Mobile: string,
      public Code: string,
      public RecaptchaResponse: string
    ) {}
  }
  