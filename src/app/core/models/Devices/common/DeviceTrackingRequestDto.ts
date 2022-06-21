
export class DeviceTrackingRequestDto {
    constructor(
        public Token: string,
        public RecaptchaResponse: string
    ) {}
  }