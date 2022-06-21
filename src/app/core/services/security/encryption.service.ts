import { Injectable } from '@angular/core';

import * as CryptoJS from 'crypto-js';
import * as lzString from 'lz-string';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
 
 

  secretKey = CryptoJS.enc.Utf8.parse('8880808077808085');
   iv = CryptoJS.enc.Utf8.parse('8880808077808085');

  constructor() { }

  Encryp(value : string) : string
  {
    const key = this.secretKey;
    const iv = this.secretKey;
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()),
    key,
    {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  Decrypt(value : string) : string
  {
    try{
      const key = this.secretKey;
      const iv = this.secretKey;
      const decrypt = CryptoJS.AES.decrypt(value,
        key,
        {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
        });
  
      return decrypt.toString(CryptoJS.enc.Utf8);
    }
    catch
    {
      return '';
    }
  }

  Compress(input : string) : string
  {
    return lzString.compress(input);
  }
  DeCompress(input : string) : string
  {
    return lzString.decompress(input) + '';
  }
}
 