function gregorianToJDN(year, month, day) {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function jdnToGregorian(JDN) {
  const a = JDN + 32044;
  const b = Math.floor((4 * a + 3) / 146097);
  const c = a - Math.floor((146097 * b) / 4);
  const d = Math.floor((4 * c + 3) / 1461);
  const e = c - Math.floor((1461 * d) / 4);
  const m = Math.floor((5 * e + 2) / 153);
  return {
    day: e - Math.floor((153 * m + 2) / 5) + 1,
    month: m + 3 - 12 * Math.floor(m / 10),
    year: 100 * b + d - 4800 + Math.floor(m / 10),
  };
}

const ETH_EPOCH = 1724221;

function ethToJDN(year, month, day) {
  const cycleNo = Math.floor((year - 1) / 4);
  const posInCycle = (year - 1) % 4;
  const partialDays = [0, 365, 730, 1096][posInCycle];
  return ETH_EPOCH + 1461 * cycleNo + partialDays + 30 * (month - 1) + (day - 1);
}

function jdnToEth(JDN) {
  const r = JDN - ETH_EPOCH;
  const cycleNo = Math.floor(r / 1461);
  const dayInCycle = r % 1461;
  let posInCycle, dayOfYear;
  if      (dayInCycle <  365)  { posInCycle = 0; dayOfYear = dayInCycle; }
  else if (dayInCycle <  730)  { posInCycle = 1; dayOfYear = dayInCycle - 365; }
  else if (dayInCycle < 1096)  { posInCycle = 2; dayOfYear = dayInCycle - 730; }
  else                         { posInCycle = 3; dayOfYear = dayInCycle - 1096; }
  return {
    year: 4 * cycleNo + posInCycle + 1,
    month: Math.floor(dayOfYear / 30) + 1,
    day: (dayOfYear % 30) + 1,
  };
}

export const isEthLeapYear = (year) => year % 4 === 3;

export const getDaysInEthMonth = (year, month) => {
  if (month < 13) return 30;
  return isEthLeapYear(year) ? 6 : 5;
};

export const getDaysInGregorianMonth = (year, month) => new Date(year, month, 0).getDate();

export const getGregorianFirstDay = (year, month) => new Date(year, month - 1, 1).getDay();

export const getEthFirstDay = (year, month) => {
  const g = jdnToGregorian(ethToJDN(year, month, 1));
  return new Date(g.year, g.month - 1, g.day).getDay();
};

export const dateToEth = (date) => jdnToEth(gregorianToJDN(date.getFullYear(), date.getMonth() + 1, date.getDate()));

export const ethToDate = (year, month, day) => {
  const g = jdnToGregorian(ethToJDN(year, month, day));
  return new Date(g.year, g.month - 1, g.day);
};

export const ETHIOPIAN_MONTHS_AM = ['መስከረም','ጥቅምት','ሕዳር','ታሕሳስ','ጥር','የካቲት','መጋቢት','ሚያዚያ','ግንቦት','ሰኔ','ሐምሌ','ነሐሴ','ፓጉሜ',];
export const ETHIOPIAN_DAYS_AM = ['እሑ','ሰኞ','ማክ','ረቡ','ሐሙ','ዓር','ቅዳ'];
export const GREGORIAN_MONTHS_EN = ['January','February','March','April','May','June','July','August','September','October','November','December',];
export const GREGORIAN_DAYS_EN = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

export const formatEthDate = (eth) => eth ? `${ETHIOPIAN_MONTHS_AM[eth.month - 1]} ${eth.day}፣ ${eth.year} ዓ.ም` : '';
export const formatGregDate = (date) => date ? date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : '';

export const prevEthMonth = ({ year, month }) => month === 1 ? { year: year - 1, month: 13 } : { year, month: month - 1 };
export const nextEthMonth = ({ year, month }) => month === 13 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
export const prevGregMonth = ({ year, month }) => month === 1 ? { year: year - 1, month: 12 } : { year, month: month - 1 };
export const nextGregMonth = ({ year, month }) => month === 12 ? { year: year + 1, month: 1 } : { year, month: month + 1 };
