import React, { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import {
    ETHIOPIAN_MONTHS_AM,
    ETHIOPIAN_DAYS_AM,
    GREGORIAN_MONTHS_EN,
    GREGORIAN_DAYS_EN,
    getDaysInEthMonth,
    getDaysInGregorianMonth,
    getGregorianFirstDay,
    getEthFirstDay,
    dateToEth,
    ethToDate,
    formatEthDate,
    formatGregDate,
    prevEthMonth,
    nextEthMonth,
    prevGregMonth,
    nextGregMonth,
    EthDate,
} from '../utils/calendar';

// --- INTERNAL SVG ICONS (Zero Dependency) ---
const ChevronLeftIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
);
const ChevronRightIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
);
const CalendarIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
);
const XIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
);
const SwitchIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4"/><path d="M7 20V4"/><path d="m21 8-4-4-4 4"/><path d="M17 4v16"/></svg>
);

const cn = (...c: (string | boolean | undefined)[]) => c.filter(Boolean).join(' ');

export interface CustomClasses {
    base?: string;
    container?: string;
    picker?: string;
    dropdown?: string;
    navBtn?: string;
    weekday?: string;
    dayCell?: { base?: string };
    header?: { container?: string; navBtn?: string; picker?: string; dropdown?: string };
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

function DayCell({ label, isToday, isSelected, isEmpty, onClick, customClasses = {} }: {
    label?: string | number;
    isToday?: boolean;
    isSelected?: boolean;
    isEmpty?: boolean;
    onClick?: () => void;
    customClasses?: { base?: string };
}) {
    if (isEmpty) return <div className="w-9 h-9" />;
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'w-9 h-9 rounded-lg text-sm font-medium flex items-center justify-center transition-all duration-100 focus:outline-none select-none',
                isSelected ? 'shadow-md scale-105 font-bold' : '',
                customClasses.base
            )}
            style={{
                backgroundColor: isSelected
                    ? 'var(--dp-selected-bg)'
                    : isToday
                        ? 'var(--dp-primary-alpha)'
                        : 'transparent',
                color: isSelected
                    ? '#fff'
                    : isToday
                        ? 'var(--dp-accent)'
                        : 'var(--dp-text)',
                boxShadow: (isSelected ? '0 4px 12px var(--dp-selected-shadow)' : 'none') as any,
                border: (isToday && !isSelected ? '2px solid var(--dp-today-ring)' : 'none') as any,
            }}
        >
            {label}
        </button>
    );
}

interface HeaderProps {
    onPrev: () => void;
    onNext: () => void;
    month: number;
    monthList?: string[];
    onMonthChange?: (m: number) => void;
    badge?: ReactNode;
    year: number;
    yearSuffix?: string;
    yearRange?: number[];
    onYearChange?: (y: number) => void;
    customClasses?: { container?: string; navBtn?: string; picker?: string; dropdown?: string };
    Icons: IconsConfig;
}

function CalendarHeader({
    onPrev, onNext,
    month, monthList = [], onMonthChange,
    badge,
    year, yearSuffix = '', yearRange = [], onYearChange,
    customClasses = {},
    Icons
}: HeaderProps) {
    const [monthOpen, setMonthOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const monthListRef = useRef<HTMLDivElement>(null);
    const yearListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!monthOpen || !monthListRef.current) return;
        const el = monthListRef.current.querySelector('[data-selected="true"]');
        if (el) el.scrollIntoView({ block: 'center' });
    }, [monthOpen]);

    useEffect(() => {
        if (!yearOpen || !yearListRef.current) return;
        const el = yearListRef.current.querySelector('[data-selected="true"]');
        if (el) el.scrollIntoView({ block: 'center' });
    }, [yearOpen]);

    const toggleMonth = () => { setMonthOpen(o => !o); setYearOpen(false); };
    const toggleYear = () => { setYearOpen(o => !o); setMonthOpen(false); };

    const pickerBtnStyle = (isOpen: boolean) => ({
        backgroundColor: isOpen ? 'var(--dp-primary)' : 'var(--dp-primary-alpha)',
        color: isOpen ? '#fff' : 'var(--dp-accent)'
    });

    const itemStyle = (active: boolean) => ({
        backgroundColor: active ? 'var(--dp-primary)' : 'transparent',
        color: active ? '#fff' : 'var(--dp-text)'
    });

    const dropdownCls = cn('absolute z-50 top-full left-1/2 -translate-x-1/2 mt-1 overflow-y-auto rounded-xl border shadow-2xl', customClasses.dropdown);

    const Prev = Icons.ChevronLeft || ChevronLeftIcon;
    const Next = Icons.ChevronRight || ChevronRightIcon;

    return (
        <div className={cn('flex items-center justify-between mb-3', customClasses.container)}>
            <button
                type="button"
                onClick={onPrev}
                className={cn("w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10", customClasses.navBtn)}
                style={{ color: 'var(--dp-text-muted)' }}
            >
                <Prev size={16} />
            </button>

            <div className="flex items-center gap-1 select-none">
                {monthList.length > 0 && onMonthChange ? (
                    <div className="relative">
                        <button
                            type="button"
                            onClick={toggleMonth}
                            style={pickerBtnStyle(monthOpen)}
                            className={cn('text-xs font-bold px-2.5 py-1 rounded-lg transition-all', customClasses.picker)}
                        >
                            {monthList[month - 1]} {badge && <span className="ml-0.5">{badge}</span>}▾
                        </button>
                        {monthOpen && (
                            <div
                                ref={monthListRef}
                                className={cn(dropdownCls, 'w-32 max-h-44')}
                                style={{
                                    scrollbarWidth: 'thin',
                                    backgroundColor: 'var(--dp-bg)',
                                    borderColor: 'var(--dp-border)'
                                } as any}
                            >
                                {monthList.map((name, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        data-selected={idx + 1 === month ? 'true' : 'false'}
                                        onClick={() => { onMonthChange(idx + 1); setMonthOpen(false); }}
                                        className={cn('w-full text-center text-xs py-2 transition-colors whitespace-nowrap px-3 hover:bg-[var(--dp-border)]')}
                                        style={itemStyle(idx + 1 === month)}
                                    >
                                        {name}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : null}

                {yearRange.length > 0 && onYearChange ? (
                    <div className="relative">
                        <button
                            type="button"
                            onClick={toggleYear}
                            style={pickerBtnStyle(yearOpen)}
                            className={cn('text-xs font-bold px-2.5 py-1 rounded-lg transition-all', customClasses.picker)}
                        >
                            {year}{yearSuffix} ▾
                        </button>
                        {yearOpen && (
                            <div
                                ref={yearListRef}
                                className={cn(dropdownCls, 'w-28 max-h-44')}
                                style={{
                                    scrollbarWidth: 'thin',
                                    backgroundColor: 'var(--dp-bg)',
                                    borderColor: 'var(--dp-border)'
                                } as any}
                            >
                                {yearRange.map(y => (
                                    <button
                                        key={y}
                                        type="button"
                                        data-selected={y === year ? 'true' : 'false'}
                                        onClick={() => { onYearChange(y); setYearOpen(false); }}
                                        className={cn('w-full text-center text-xs py-2 transition-colors whitespace-nowrap px-3 hover:bg-[var(--dp-border)]')}
                                        style={itemStyle(y === year)}
                                    >
                                        {y}{yearSuffix}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ) : null}
            </div>

            <button
                type="button"
                onClick={onNext}
                className={cn("w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10", customClasses.navBtn)}
                style={{ color: 'var(--dp-text-muted)' }}
            >
                <Next size={16} />
            </button>
        </div>
    );
}

interface EthGridProps {
    year: number;
    month: number;
    selectedEth: EthDate | null;
    todayEth: EthDate | null;
    onSelect: (y: number, m: number, d: number) => void;
    labels?: { days?: string[] };
    customClasses?: { weekday?: string; dayCell?: { base?: string } };
}

function EthGrid({ year, month, selectedEth, todayEth, onSelect, labels = {}, customClasses = {} }: EthGridProps) {
    const firstDay = getEthFirstDay(year, month);
    const totalDays = getDaysInEthMonth(year, month);
    const dayLabels = labels.days || ETHIOPIAN_DAYS_AM;

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++)    cells.push(null);
    for (let d = 1; d <= totalDays; d++)  cells.push(d);

    return (
        <div className="grid grid-cols-7 gap-y-1 gap-x-0.5">
            {dayLabels.map((d) => (
                <div
                    key={d}
                    className={cn("w-9 h-7 flex items-center justify-center font-bold", customClasses.weekday)}
                    style={{ color: 'var(--dp-accent)', fontSize: '10.5px', opacity: 0.9 }}
                >
                    {d}
                </div>
            ))}
            {cells.map((day, i) =>
                day === null ? (
                    <DayCell key={`b${i}`} isEmpty />
                ) : (
                    <DayCell
                        key={`d${day}`}
                        label={day}
                        customClasses={customClasses.dayCell}
                        isToday={todayEth && day === todayEth.day && month === todayEth.month && year === todayEth.year ? true : false}
                        isSelected={selectedEth && day === selectedEth.day && month === selectedEth.month && year === selectedEth.year ? true : false}
                        onClick={() => onSelect(year, month, day)}
                    />
                )
            )}
        </div>
    );
}

interface GregGridProps {
    year: number;
    month: number;
    selectedDate: Date | null;
    today: Date;
    onSelect: (date: Date) => void;
    labels?: { days?: string[] };
    customClasses?: { weekday?: string; dayCell?: { base?: string } };
}

function GregGrid({ year, month, selectedDate, today, onSelect, labels = {}, customClasses = {} }: GregGridProps) {
    const firstDay = getGregorianFirstDay(year, month);
    const totalDays = getDaysInGregorianMonth(year, month);
    const dayLabels = labels.days || GREGORIAN_DAYS_EN;

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++)   cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);

    const same = (d: number, ref: Date | null) => ref && d === ref.getDate() && month === ref.getMonth() + 1 && year === ref.getFullYear();

    return (
        <div className="grid grid-cols-7 gap-y-1 gap-x-0.5">
            {dayLabels.map((d) => (
                <div
                    key={d}
                    className={cn("w-9 h-7 flex items-center justify-center font-bold", customClasses.weekday)}
                    style={{ color: 'var(--dp-accent)', fontSize: '10.5px', opacity: 0.8 }}
                >
                    {d}
                </div>
            ))}
            {cells.map((day, i) =>
                day === null ? (
                    <DayCell key={`b${i}`} isEmpty />
                ) : (
                    <DayCell
                        key={`d${day}`}
                        label={day}
                        customClasses={customClasses.dayCell}
                        isToday={same(day, today) ? true : false}
                        isSelected={same(day, selectedDate) ? true : false}
                        onClick={() => onSelect(new Date(year, month - 1, day))}
                    />
                )
            )}
        </div>
    );
}

function DropdownPortal({ anchorRef, children, dropW = 316 }: { anchorRef: React.RefObject<HTMLElement | null>; children: ReactNode; dropW?: number }) {
    const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });

    const updatePosition = useCallback(() => {
        if (!anchorRef.current) return;
        const rect = anchorRef.current.getBoundingClientRect();
        let left = rect.left + window.scrollX;
        
        // Prevent overflow
        if (left + dropW > window.innerWidth - 8) {
            left = window.innerWidth - dropW - 8;
        }
        if (left < 8) left = 8;

        setStyle({
            position: 'absolute',
            top: rect.bottom + window.scrollY + 6,
            left,
            width: dropW,
            zIndex: 99999,
            opacity: 1,
            transition: 'opacity 0.15s ease-out'
        });
    }, [anchorRef, dropW]);

    useEffect(() => {
        updatePosition();
        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);
        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [updatePosition]);

    return createPortal(<div style={style}>{children}</div>, document.body);
}

export default function EthiopianDatePicker({
    value = null,
    onChange,
    defaultCalendar = 'ethiopian',
    label,
    placeholder = 'ቀን ይምረጡ…',
    disabled = false,
    customization = {}
}: EthiopianDatePickerProps) {
    const { labels = {}, classes = {}, config = {}, colors = {} } = customization;

    const Icons = {
        Calendar: config.icons?.Calendar || CalendarIcon,
        X: config.icons?.X || XIcon,
        ChevronLeft: config.icons?.ChevronLeft || ChevronLeftIcon,
        ChevronRight: config.icons?.ChevronRight || ChevronRightIcon,
        Switch: config.icons?.Switch || SwitchIcon,
    };

    const sizeCls = {
        sm: 'px-3 py-1.5 text-xs rounded-lg gap-2',
        md: 'px-4 py-2.5 text-sm rounded-xl gap-3',
        lg: 'px-5 py-3.5 text-base rounded-2xl gap-4',
    }[config.inputSize || 'md'];

    const themeStyles = {
        '--dp-primary': colors.primary || '#7c3aed',
        '--dp-primary-alpha': colors.primary ? `${colors.primary}26` : 'rgba(124, 58, 237, 0.15)',
        '--dp-bg': colors.background || '#111827',
        '--dp-bg-alt': colors.backgroundAlt || 'rgba(0, 0, 0, 0.2)',
        '--dp-border': colors.border || 'rgba(255, 255, 255, 0.1)',
        '--dp-text': colors.text || '#f3f4f6',
        '--dp-text-muted': colors.textMuted || '#9ca3af',
        '--dp-accent': colors.accent || '#a78bfa',
        '--dp-today-ring': colors.todayRing || '#a78bfa',
        '--dp-selected-bg': colors.selectedBg || '#7c3aed',
        '--dp-selected-shadow': colors.selectedShadow || 'rgba(109, 40, 217, 0.4)',
        fontSize: config.fontSize || 'inherit',
        fontFamily: config.fontFamily || 'inherit',
    } as React.CSSProperties;

    const todayJS = new Date();
    const todayEth = dateToEth(todayJS);

    const [open, setOpen] = useState(false);
    const [calType, setCalType] = useState(defaultCalendar);
    const [pinnedEth, setPinnedEth] = useState<EthDate | null>(null);

    const initEth = value ? dateToEth(value) : todayEth;
    const [ethNav, setEthNav] = useState({ year: initEth.year, month: initEth.month });
    const [gregNav, setGregNav] = useState({
        year: value ? value.getFullYear() : todayJS.getFullYear(),
        month: value ? value.getMonth() + 1 : todayJS.getMonth() + 1,
    });

    const triggerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        const handle = (e: MouseEvent) => {
            if (triggerRef.current?.contains(e.target as Node)) return;
            if ((e.target as HTMLElement).closest('[data-eth-dp]')) return;
            setOpen(false);
        };
        document.addEventListener('mousedown', handle, true);
        return () => document.removeEventListener('mousedown', handle, true);
    }, [open]);

    useEffect(() => {
        if (!value) {
            setPinnedEth(null);
            return;
        }
        if (!pinnedEth) {
            const e = dateToEth(value);
            setEthNav({ year: e.year, month: e.month });
        }
        setGregNav({ year: value.getFullYear(), month: value.getMonth() + 1 });
    }, [value, pinnedEth]);

    const selectedEth = pinnedEth ?? (value ? dateToEth(value) : null);

    const handleEthSelect = useCallback((y: number, m: number, d: number) => {
        const eth = { year: y, month: m, day: d };
        setPinnedEth(eth);
        setEthNav({ year: y, month: m });
        onChange?.(ethToDate(y, m, d));
        setOpen(false);
    }, [onChange]);

    const handleGregSelect = useCallback((date: Date) => {
        setPinnedEth(null);
        setGregNav({ year: date.getFullYear(), month: date.getMonth() + 1 });
        onChange?.(date);
        setOpen(false);
    }, [onChange]);

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        setPinnedEth(null);
        onChange?.(null);
    };

    const displayLabel = value
        ? calType === 'ethiopian'
            ? formatEthDate(selectedEth)
            : formatGregDate(value)
        : '';

    const isPagume = calType === 'ethiopian' && ethNav.month === 13;
    const pagumeDay = isPagume ? getDaysInEthMonth(ethNav.year, 13) : 0;

    const Calendar = Icons.Calendar || CalendarIcon;
    const X = Icons.X || XIcon;
    const Switch = Icons.Switch || SwitchIcon;

    return (
        <div style={themeStyles} className="eth-dp-theme-root">
            <div ref={triggerRef} className={cn("relative w-full", classes.container)}>
                {label && (
                    <label className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: 'var(--dp-text-muted)' }}>
                        {label}
                    </label>
                )}

                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => { if (!disabled) setOpen(o => !o); }}
                    className={cn(
                        'w-full flex items-center border text-left transition-all duration-200 focus:outline-none',
                        sizeCls,
                        disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-[var(--dp-border)]',
                        classes.trigger
                    )}
                    style={{
                        backgroundColor: 'var(--dp-bg-alt)',
                        borderColor: open ? 'var(--dp-primary)' : 'var(--dp-border)',
                        boxShadow: (open ? '0 0 0 4px var(--dp-primary-alpha)' : 'none') as any
                    }}
                >
                    <Calendar size={config.inputSize === 'sm' ? 13 : 15} style={{ color: 'var(--dp-accent)' }} className="shrink-0" />
                    <span className="flex-1 truncate" style={{ color: value ? 'var(--dp-text)' : 'var(--dp-text-muted)' }}>
                        {displayLabel || placeholder}
                    </span>
                    {value && !disabled && !config.hideClear && (
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={handleClear}
                            className="p-0.5 rounded hover:bg-white/10 transition-colors shrink-0"
                            style={{ color: 'var(--dp-text-muted)' }}
                        >
                            <X size={config.inputSize === 'sm' ? 12 : 14} />
                        </span>
                    )}
                </button>
            </div>

            {open && (
                <DropdownPortal anchorRef={triggerRef} dropW={config.dropdownWidth || 316}>
                    <div
                        data-eth-dp="true"
                        className={cn("rounded-2xl border shadow-2xl overflow-hidden", classes.dropdown)}
                        style={{
                            ...themeStyles,
                            backgroundColor: 'var(--dp-bg)',
                            borderColor: 'var(--dp-border)',
                            color: 'var(--dp-text)',
                            animation: 'dpIn 0.16s cubic-bezier(.22,.68,0,1.2) both',
                            zIndex: 999999
                        } as any}
                    >
                        <div className="flex items-center justify-between px-4 py-2.5 border-b" style={{ borderColor: 'var(--dp-border)', backgroundColor: 'var(--dp-bg-alt)' }}>
                            <div className="flex rounded-lg p-0.5 gap-0.5" style={{ backgroundColor: 'var(--dp-border)' }}>
                                <button
                                    type="button"
                                    onClick={() => setCalType('ethiopian')}
                                    className="px-3 py-1 rounded-md text-xs font-semibold transition-all"
                                    style={{
                                        backgroundColor: calType === 'ethiopian' ? 'var(--dp-primary)' : 'transparent',
                                        color: calType === 'ethiopian' ? '#fff' : 'var(--dp-text-muted)'
                                    }}
                                >
                                    {labels.ethTab || '🇪🇹 ኢትዮጵያ'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCalType('gregorian')}
                                    className="px-3 py-1 rounded-md text-xs font-semibold transition-all"
                                    style={{
                                        backgroundColor: calType === 'gregorian' ? 'var(--dp-primary)' : 'transparent',
                                        color: calType === 'gregorian' ? '#fff' : 'var(--dp-text-muted)'
                                    }}
                                >
                                    {labels.gregTab || '🌍 Gregorian'}
                                </button>
                            </div>
                            {!config.hideSwitch && (
                                <button
                                    type="button"
                                    onClick={() => setCalType(c => c === 'ethiopian' ? 'gregorian' : 'ethiopian')}
                                    className="w-7 h-7 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10"
                                    style={{ color: 'var(--dp-text-muted)' }}
                                >
                                    <Switch size={13} />
                                </button>
                            )}
                        </div>

                        <div className="p-4">
                            {calType === 'ethiopian' ? (
                                <>
                                    <CalendarHeader
                                        Icons={Icons}
                                        month={ethNav.month}
                                        monthList={labels.ethiopianMonths || ETHIOPIAN_MONTHS_AM}
                                        onMonthChange={(m) => setEthNav(n => ({ ...n, month: m }))}
                                        badge={isPagume
                                            ? <span className="text-[10px] bg-amber-400/10 border border-amber-400/20 px-1 py-0.5 rounded-full ml-0.5 text-amber-400">{pagumeDay}{labels.pagumeSuffix || 'ቀ'}</span>
                                            : null
                                        }
                                        year={ethNav.year}
                                        yearSuffix=" ዓ.ም"
                                        yearRange={config.yearRangeEth || Array.from({ length: 201 }, (_, i) => 1950 + i)}
                                        onYearChange={(y) => setEthNav(n => ({ ...n, year: y }))}
                                        onPrev={() => setEthNav(n => prevEthMonth(n))}
                                        onNext={() => setEthNav(n => nextEthMonth(n))}
                                        customClasses={classes.header}
                                    />
                                    <EthGrid
                                        year={ethNav.year}
                                        month={ethNav.month}
                                        selectedEth={selectedEth}
                                        todayEth={todayEth}
                                        onSelect={handleEthSelect}
                                        labels={{ days: labels.ethiopianDays }}
                                        customClasses={{ weekday: classes.weekday, dayCell: classes.dayCell }}
                                    />
                                    {isPagume && (
                                        <div className="mt-3 rounded-lg border px-3 py-2 text-[11px] text-center leading-relaxed" style={{ backgroundColor: 'rgba(251, 191, 36, 0.1)', borderColor: 'rgba(251, 191, 36, 0.2)', color: '#fcd34d' }}>
                                            ፓጉሜ {pagumeDay} ቀናት አሉት
                                            {pagumeDay === 6 ? ' · ዘመነ ዮሐንስ (የሐሙስ ዓመት)' : ' · ዘመነ ማቴዎስ / ማርቆስ / ሉቃስ'}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <>
                                    <CalendarHeader
                                        Icons={Icons}
                                        month={gregNav.month}
                                        monthList={labels.gregorianMonths || GREGORIAN_MONTHS_EN}
                                        onMonthChange={(m) => setGregNav(n => ({ ...n, month: m }))}
                                        year={gregNav.year}
                                        yearSuffix=""
                                        yearRange={config.yearRangeGreg || Array.from({ length: 201 }, (_, i) => 1957 + i)}
                                        onYearChange={(y) => setGregNav(n => ({ ...n, year: y }))}
                                        onPrev={() => setGregNav(n => prevGregMonth(n))}
                                        onNext={() => setGregNav(n => nextGregMonth(n))}
                                        customClasses={classes.header}
                                    />
                                    <GregGrid
                                        year={gregNav.year}
                                        month={gregNav.month}
                                        selectedDate={value}
                                        today={todayJS}
                                        onSelect={handleGregSelect}
                                        labels={{ days: labels.gregorianDays }}
                                        customClasses={{ weekday: classes.weekday, dayCell: classes.dayCell }}
                                    />
                                </>
                            )}
                        </div>

                        <div className={cn("px-4 py-3 border-t flex items-center justify-between gap-3", classes.footer)} style={{ borderColor: 'var(--dp-border)', backgroundColor: 'var(--dp-bg-alt)' }}>
                            <button
                                type="button"
                                onClick={() => {
                                    const t = new Date();
                                    const e = dateToEth(t);
                                    if (calType === 'ethiopian') {
                                        setEthNav({ year: e.year, month: e.month });
                                        handleEthSelect(e.year, e.month, e.day);
                                    } else {
                                        setGregNav({ year: t.getFullYear(), month: t.getMonth() + 1 });
                                        handleGregSelect(t);
                                    }
                                }}
                                className="text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-all hover:brightness-110 active:scale-95 flex items-center gap-1.5"
                                style={{
                                    backgroundColor: 'var(--dp-primary-alpha)',
                                    borderColor: 'var(--dp-primary)',
                                    color: 'var(--dp-accent)'
                                }}
                            >
                                <CalendarIcon size={12} />
                                {labels.today || 'ዛሬ (Today)'}
                            </button>

                            {value && selectedEth && (
                                <div className="flex-1 rounded-xl border p-2.5 space-y-1 max-w-[170px]" style={{ backgroundColor: 'var(--dp-bg)', borderColor: 'var(--dp-border)' }}>
                                    <div className="flex items-center justify-between gap-2 overflow-hidden">
                                        <span className="text-[9px] uppercase font-black opacity-30 shrink-0">Eth</span>
                                        <span className="text-[10px] font-bold truncate text-right" style={{ color: 'var(--dp-accent)' }}>
                                            {formatEthDate(selectedEth).split('፣')[0]}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2 overflow-hidden">
                                        <span className="text-[9px] uppercase font-black opacity-30 shrink-0">Greg</span>
                                        <span className="text-[10px] font-bold truncate text-right text-gray-300">
                                            {value.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </DropdownPortal>
            )}

            <style>{`
                .eth-dp-theme-root [type="button"]:hover {
                    background-color: var(--dp-border);
                }
                @keyframes dpIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}
