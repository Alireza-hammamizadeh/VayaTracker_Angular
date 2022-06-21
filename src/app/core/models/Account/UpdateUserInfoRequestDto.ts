export class UpdateUserInfoRequestDto {
    constructor(
      public FirstName: string,
      public LastName: string,
      public Email: string,
      public Mobile: string,
      public RecaptchaResponse: string
    ) {}
  }