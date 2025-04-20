import CryptoJS from 'crypto-js';

import { CardData } from './types/types';

export function encryptData(data: CardData, key: string): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

export function decryptData<T>(data: string, key: string): T {
  const bytes = CryptoJS.AES.decrypt(data, key);

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}
