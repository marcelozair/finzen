export const parseCurrency = (value: number, currency = 'PEN'): string => {
  const currencyOptions = { style: 'currency', currency } as Intl.NumberFormatOptions;
  const parse = new Intl.NumberFormat('es-PE', currencyOptions).format(value);

  return parse;
};