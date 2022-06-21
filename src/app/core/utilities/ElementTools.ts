import { Injectable } from '@angular/core';

declare var $: any;

@Injectable({
  providedIn: 'root',
})
export class ElementTools {
  setInputFilter(
    textbox: Element,
    inputFilter: (value: string) => boolean
  ): void {
    [
      'input',
      'keydown',
      'keyup',
      'mousedown',
      'mouseup',
      'select',
      'contextmenu',
      'drop',
    ].forEach(function (event) {
      textbox.addEventListener(
        event,
        function (
          this: (HTMLInputElement | HTMLTextAreaElement) & {
            oldValue: string;
            oldSelectionStart: number | null;
            oldSelectionEnd: number | null;
          }
        ) {
          if (inputFilter(this.value)) {
            this.oldValue = this.value;
            this.oldSelectionStart = this.selectionStart;
            this.oldSelectionEnd = this.selectionEnd;
          } else if (Object.prototype.hasOwnProperty.call(this, 'oldValue')) {
            this.value = this.oldValue;
            if (
              this.oldSelectionStart !== null &&
              this.oldSelectionEnd !== null
            ) {
              this.setSelectionRange(
                this.oldSelectionStart,
                this.oldSelectionEnd
              );
            }
          } else {
            this.value = '';
          }
        }
      );
    });
  }

  changeRecaptchaElementLanguage(language: string): void {
    //For Real Time Recaptcha Language Change
    for (let i = 0; 99 > i; i++) {
      const captchaElm = $('#ngrecaptcha-' + i).find('iframe');
      if (captchaElm.length) {
        let src = captchaElm.attr('src');
        src = src.replace(/(hl=)[^\&]+/, `$1${language}`);
        captchaElm.attr('src', src);
        return;
      }
    }
  }
}
