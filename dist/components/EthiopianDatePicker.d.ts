import { default as React } from 'react';
import { EthDate } from '../utils/calendar';
export interface CustomClasses {
    base?: string;
    container?: string;
    picker?: string;
    dropdown?: string;
    navBtn?: string;
    weekday?: string;
    dayCell?: {
        base?: string;
    };
    header?: {
        container?: string;
        navBtn?: string;
        picker?: string;
        dropdown?: string;
    };
    footer?: string;
    trigger?: string;
}
export interface IconsConfig {
    Calendar?: React.ElementType;
    X?: React.ElementType;
    ChevronLeft?: React.ElementType;
    ChevronRight?: React.ElementType;
    Switch?: React.ElementType;
}
export interface Customization {
    labels?: {
        ethTab?: string;
        gregTab?: string;
        ethiopianMonths?: string[];
        ethiopianDays?: string[];
        gregorianMonths?: string[];
        gregorianDays?: string[];
        pagumeSuffix?: string;
        today?: string;
    };
    classes?: CustomClasses;
    config?: {
        icons?: IconsConfig;
        inputSize?: 'sm' | 'md' | 'lg';
        dropdownWidth?: number;
        fontSize?: string;
        fontFamily?: string;
        hideClear?: boolean;
        hideSwitch?: boolean;
        yearRangeEth?: number[];
        yearRangeGreg?: number[];
    };
    colors?: {
        primary?: string;
        background?: string;
        backgroundAlt?: string;
        border?: string;
        text?: string;
        textMuted?: string;
        accent?: string;
        todayRing?: string;
        selectedBg?: string;
        selectedShadow?: string;
    };
}
export interface EthiopianDatePickerProps {
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    defaultCalendar?: 'ethiopian' | 'gregorian';
    label?: string;
    placeholder?: string;
    disabled?: boolean;
    customization?: Customization;
}
export interface EthGridProps {
    year: number;
    month: number;
    selectedEth: EthDate | null;
    todayEth: EthDate | null;
    onSelect: (y: number, m: number, d: number) => void;
    labels?: {
        days?: string[];
    };
    customClasses?: {
        weekday?: string;
        dayCell?: {
            base?: string;
        };
    };
}
export interface GregGridProps {
    year: number;
    month: number;
    selectedDate: Date | null;
    today: Date;
    onSelect: (date: Date) => void;
    labels?: {
        days?: string[];
    };
    customClasses?: {
        weekday?: string;
        dayCell?: {
            base?: string;
        };
    };
}
export default function EthiopianDatePicker({ value, onChange, defaultCalendar, label, placeholder, disabled, customization }: EthiopianDatePickerProps): import("react/jsx-runtime").JSX.Element;
