export class ChangePasswordRequestDto {
    constructor(
        public OldPassword: string,
        public NewPassword: string,
        public Mobile: string,
        public RecaptchaResponse: string,
      ) {}
  }