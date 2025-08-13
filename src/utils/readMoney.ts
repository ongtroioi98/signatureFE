/**
 * Currency group
 * @param {string} group
 * @returns GroupedCurrency
 */
export const readGroup = (group: any) => {
  const readDigit = [
    ' Không',
    ' Một',
    ' Hai',
    ' Ba',
    ' Bốn',
    ' Năm',
    ' Sáu',
    ' Bảy',
    ' Tám',
    ' Chín',
  ];
  let temp = '';
  if (group === '000') return '';
  temp = readDigit?.[parseInt(group?.substring(0, 1))] + ' Trăm';
  if (group?.substring(1, 2) === '0')
    if (group?.substring(2, 3) === '0') return temp;
    else {
      temp += ' Lẻ' + readDigit?.[parseInt(group?.substring(2, 3))];
      return temp;
    }
  else temp += readDigit?.[parseInt(group?.substring(1, 2))] + ' Mươi';
  if (group?.substring(2, 3) === '5') temp += ' Lăm';
  else if (group?.substring(2, 3) !== '0')
    temp += readDigit?.[parseInt(group?.substring(2, 3))];
  return temp;
};

/**
 * Convert digital currency to Text Currency
 * @param num : digital currency
 * @returns Text Currency
 */
export const readMoney = (num: any, currency = ' Việt Nam Đồng') => {
  if (!num || num == null || num == '' || num == 'null') return '';

  let numString = String(Math.abs(Number(num))) || '';
  let temp = '';
  let surplus = '';
  if (numString.split('.')?.length > 1) {
    // eslint-disable-next-line no-unsafe-optional-chaining
    [numString, surplus] = numString.split('.');
  }

  while (numString.length < 18) {
    numString = '0' + numString;
  }
  const g1 = numString.substring(0, 3);
  const g2 = numString.substring(3, 6);
  const g3 = numString.substring(6, 9);
  const g4 = numString.substring(9, 12);
  const g5 = numString.substring(12, 15);
  const g6 = numString.substring(15, 18);
  if (g1 !== '000') {
    temp = readGroup(g1);
    temp += ' Triệu';
  }
  if (g2 !== '000') {
    temp += readGroup(g2);
    temp += ' Nghìn';
  }
  if (g3 !== '000') {
    temp += readGroup(g3);
    temp += ' Tỷ';
  } else if ('' !== temp) {
    temp += ' Tỷ';
  }
  if (g4 !== '000') {
    temp += readGroup(g4);
    temp += ' Triệu';
  }
  if (g5 !== '000') {
    temp += readGroup(g5);
    temp += ' Nghìn';
  }
  temp = temp + readGroup(g6);
  temp = temp.replaceAll('Một Mươi', 'Mười');
  temp = temp?.trim();
  temp = temp?.replaceAll('Không Trăm', '');
  temp = temp?.trim();
  temp = temp?.replaceAll('Mười Không', 'Mười');
  temp = temp?.trim();
  temp = temp?.replaceAll('Mươi Không', 'Mươi');
  temp = temp?.trim();
  if (temp?.startsWith('Lẻ')) temp = temp?.substring(2);
  temp = temp?.trim();
  temp = temp?.replaceAll('Mươi Một', 'Mươi Mốt');
  temp = temp?.trim();
  let result =
    temp?.substring(0, 1)?.toUpperCase() + temp?.substring(1)?.toLowerCase();
  if (surplus) {
    result += ` phẩy ${readGroup(surplus?.padStart(3, '0'))}`?.toLowerCase();
  }
  if (Number(num) < 0) {
    result = 'Âm ' + result;
  }
  return (
    (result === '' ? 'Không' : result) + ' ' + (currency ?? 'Việt Nam Đồng')
  );
};

export function formatMoney(number: any): string {
  if (!number) return '';

  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(number));
}

export function formatPercent(number: any): string {
  if (!number) return '';

  return new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(number));
}

export function formatMoneyParser(value?: string): number {
  return value
    ?.replace(/\$\s?|(\.*)/g, '')
    ?.replace(',', '.') as unknown as number;
}

export function isNumber(value: any): boolean {
  if (typeof value === 'number') return true;

  return /^\d+(\.\d+)?$/.test(value);
}

export function formatNumber(number: any): string {
  if (!number) return '';

  return new Intl.NumberFormat('vi-VN', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(number));
}
