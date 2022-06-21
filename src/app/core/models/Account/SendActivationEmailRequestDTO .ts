export class SendActivationEmailRequestDto {
    constructor(
      public Email: string,
      public RecaptchaResponse: string
    ) {}
  }