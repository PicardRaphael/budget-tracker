export const currencies = [
  { value: 'USD', label: '$ Dollar', locale: 'en-US' },
  { value: 'EUR', label: '€ Euro', locale: 'fr-FR' },
  { value: 'JPY', label: '¥ Yen', locale: 'ja-JP' },
  { value: 'GBP', label: '£ Pound', locale: 'en-GB' },
];

export type Currency = (typeof currencies)[0];
