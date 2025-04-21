import CryptoJS from 'crypto-js';

import { CardData } from './types/types';

export function encryptData(data: CardData, key: string): string {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

export function decryptData<T>(data: string, key: string): T {
  const bytes = CryptoJS.AES.decrypt(data, key);

  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export function getCardType(cardNumber: string): string {
  // Detect card type via regex, Luhn algorithm seemed
  // overkill for this exercise
  const cleaned = cardNumber.replace(/\D/g, '');

  if (/^4\d{12}(\d{3})?(\d{3})?$/.test(cleaned)) return 'Visa';
  if (/^(5[1-5]|2[2-7])\d{14}$/.test(cleaned)) return 'MasterCard';
  if (/^3[47]\d{13}$/.test(cleaned)) return 'American Express';
  if (/^6(?:011|5\d{2}|4[4-9]\d)\d{12}$/.test(cleaned))
    return 'Discover';

  return 'Unknown';
}
