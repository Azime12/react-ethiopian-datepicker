export interface EthDate {
    year: number;
    month: number;
    day: number;
}
export declare const isEthLeapYear: (year: number) => boolean;
export declare const getDaysInEthMonth: (year: number, month: number) => number;
export declare const getDaysInGregorianMonth: (year: number, month: number) => number;
export declare const getGregorianFirstDay: (year: number, month: number) => number;
export declare const getEthFirstDay: (year: number, month: number) => number;
export declare const dateToEth: (date: Date) => EthDate;
export declare const ethToDate: (year: number, month: number, day: number) => Date;
export declare const ETHIOPIAN_MONTHS_AM: string[];
export declare const ETHIOPIAN_DAYS_AM: string[];
export declare const GREGORIAN_MONTHS_EN: string[];
export declare const GREGORIAN_DAYS_EN: string[];
export declare const formatEthDate: (eth: EthDate | null) => string;
export declare const formatGregDate: (date: Date | null) => string;
export declare const prevEthMonth: ({ year, month }: {
    year: number;
    month: number;
}) => {
    year: number;
    month: number;
};
export declare const nextEthMonth: ({ year, month }: {
    year: number;
    month: number;
}) => {
    year: number;
    month: number;
};
export declare const prevGregMonth: ({ year, month }: {
    year: number;
    month: number;
}) => {
    year: number;
    month: number;
};
export declare const nextGregMonth: ({ year, month }: {
    year: number;
    month: number;
}) => {
    year: number;
    month: number;
};
