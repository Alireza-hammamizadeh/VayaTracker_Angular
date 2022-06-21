export class EmailConfirmationRequestDto {
    constructor(
      public Email: string,
      public Code: string,
      public RecaptchaResponse: string
    ) {}
  }