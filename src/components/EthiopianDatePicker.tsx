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

// --- INTERNAL SVG ICONS ---
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
    if (isEmpty) return <div className="eth-dp-day-empty" />;
    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                'eth-dp-day',
                isSelected ? 'eth-dp-day-selected' : '',
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

    const Prev = Icons.ChevronLeft || ChevronLeftIcon;
    const Next = Icons.ChevronRight || ChevronRightIcon;

    return (
        <div className={cn('eth-dp-header', customClasses.container)}>
            <button
                type="button"
                onClick={onPrev}
                className={cn("eth-dp-nav-btn", customClasses.navBtn)}
                style={{ color: 'var(--dp-text-muted)' }}
            >
                <Prev size={16} />
            </button>

            <div className="eth-dp-picker-group">
                {monthList.length > 0 && onMonthChange ? (
                    <div className="eth-dp-rel">
                        <button
                            type="button"
                            onClick={toggleMonth}
                            style={pickerBtnStyle(monthOpen)}
                            className={cn('eth-dp-picker-btn', customClasses.picker)}
                        >
                            {monthList[month - 1]} {badge && <span className="eth-dp-badge-wrapper">{badge}</span>} ▾
                        </button>
                        {monthOpen && (
                            <div
                                ref={monthListRef}
                                className={cn('eth-dp-list-dropdown eth-dp-month-list', customClasses.dropdown)}
                                style={{
                                    backgroundColor: 'var(--dp-bg)',
                                    borderColor: 'var(--dp-border)'
                                }}
                            >
                                {monthList.map((name, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        data-selected={idx + 1 === month ? 'true' : 'false'}
                                        onClick={() => { onMonthChange(idx + 1); setMonthOpen(false); }}
                                        className="eth-dp-list-item"
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
                    <div className="eth-dp-rel">
                        <button
                            type="button"
                            onClick={toggleYear}
                            style={pickerBtnStyle(yearOpen)}
                            className={cn('eth-dp-picker-btn', customClasses.picker)}
                        >
                            {year}{yearSuffix} ▾
                        </button>
                        {yearOpen && (
                            <div
                                ref={yearListRef}
                                className={cn('eth-dp-list-dropdown eth-dp-year-list', customClasses.dropdown)}
                                style={{
                                    backgroundColor: 'var(--dp-bg)',
                                    borderColor: 'var(--dp-border)'
                                }}
                            >
                                {yearRange.map(y => (
                                    <button
                                        key={y}
                                        type="button"
                                        data-selected={y === year ? 'true' : 'false'}
                                        onClick={() => { onYearChange(y); setYearOpen(false); }}
                                        className="eth-dp-list-item"
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
                className={cn("eth-dp-nav-btn", customClasses.navBtn)}
                style={{ color: 'var(--dp-text-muted)' }}
            >
                <Next size={16} />
            </button>
        </div>
    );
}

function EthGrid({ year, month, selectedEth, todayEth, onSelect, labels = {}, customClasses = {} }: EthGridProps) {
    const firstDay = getEthFirstDay(year, month);
    const totalDays = getDaysInEthMonth(year, month);
    const dayLabels = labels.days || ETHIOPIAN_DAYS_AM;

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++)    cells.push(null);
    for (let d = 1; d <= totalDays; d++)  cells.push(d);

    return (
        <div className="eth-dp-grid">
            {dayLabels.map((d) => (
                <div
                    key={d}
                    className={cn("eth-dp-weekday", customClasses.weekday)}
                    style={{ color: 'var(--dp-accent)' }}
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

function GregGrid({ year, month, selectedDate, today, onSelect, labels = {}, customClasses = {} }: GregGridProps) {
    const firstDay = getGregorianFirstDay(year, month);
    const totalDays = getDaysInGregorianMonth(year, month);
    const dayLabels = labels.days || GREGORIAN_DAYS_EN;

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++)   cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);

    const same = (d: number, ref: Date | null) => ref && d === ref.getDate() && month === ref.getMonth() + 1 && year === ref.getFullYear();

    return (
        <div className="eth-dp-grid">
            {dayLabels.map((d) => (
                <div
                    key={d}
                    className={cn("eth-dp-weekday", customClasses.weekday)}
                    style={{ color: 'var(--dp-accent)' }}
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

// ... existing interfaces ...
export interface EthGridProps {
    year: number;
    month: number;
    selectedEth: EthDate | null;
    todayEth: EthDate | null;
    onSelect: (y: number, m: number, d: number) => void;
    labels?: { days?: string[] };
    customClasses?: { weekday?: string; dayCell?: { base?: string } };
}

export interface GregGridProps {
    year: number;
    month: number;
    selectedDate: Date | null;
    today: Date;
    onSelect: (date: Date) => void;
    labels?: { days?: string[] };
    customClasses?: { weekday?: string; dayCell?: { base?: string } };
}

function DropdownPortal({ anchorRef, children, dropW = 316 }: { anchorRef: React.RefObject<HTMLElement | null>; children: ReactNode; dropW?: number }) {
    const [style, setStyle] = useState<React.CSSProperties>({ opacity: 0 });

    const updatePosition = useCallback(() => {
        if (!anchorRef.current) return;
        const rect = anchorRef.current.getBoundingClientRect();
        let left = rect.left + window.scrollX;
        
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

    const sizeCls = `eth-dp-size-${config.inputSize || 'md'}`;

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
            <div ref={triggerRef} className={cn("eth-dp-trigger-container", classes.container)}>
                {label && (
                    <label className="eth-dp-label">
                        {label}
                    </label>
                )}

                <button
                    type="button"
                    disabled={disabled}
                    onClick={() => { if (!disabled) setOpen(o => !o); }}
                    className={cn(
                        'eth-dp-trigger',
                        sizeCls,
                        disabled ? 'eth-dp-disabled' : '',
                        classes.trigger
                    )}
                    style={{
                        backgroundColor: 'var(--dp-bg-alt)',
                        borderColor: open ? 'var(--dp-primary)' : 'var(--dp-border)',
                        boxShadow: (open ? '0 0 0 4px var(--dp-primary-alpha)' : 'none') as any
                    }}
                >
                    <Calendar size={config.inputSize === 'sm' ? 13 : 15} style={{ color: 'var(--dp-accent)' }} />
                    <span className="eth-dp-trigger-text" style={{ color: value ? 'var(--dp-text)' : 'var(--dp-text-muted)' }}>
                        {displayLabel || placeholder}
                    </span>
                    {value && !disabled && !config.hideClear && (
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={handleClear}
                            className="eth-dp-clear-btn"
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
                        className={cn("eth-dp-dropdown", classes.dropdown)}
                        style={{
                            ...themeStyles,
                            backgroundColor: 'var(--dp-bg)',
                            borderColor: 'var(--dp-border)',
                            color: 'var(--dp-text)',
                            animation: 'dpIn 0.16s cubic-bezier(.22,.68,0,1.2) both'
                        } as any}
                    >
                        <div className="eth-dp-tabs" style={{ borderColor: 'var(--dp-border)', backgroundColor: 'var(--dp-bg-alt)' }}>
                            <div className="eth-dp-tabs-group" style={{ backgroundColor: 'var(--dp-border)' }}>
                                <button
                                    type="button"
                                    onClick={() => setCalType('ethiopian')}
                                    className="eth-dp-tab"
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
                                    className="eth-dp-tab"
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
                                    className="eth-dp-tab-switch"
                                    style={{ color: 'var(--dp-text-muted)' }}
                                >
                                    <Switch size={13} />
                                </button>
                            )}
                        </div>

                        <div className="eth-dp-cal-body">
                            {calType === 'ethiopian' ? (
                                <>
                                    <CalendarHeader
                                        Icons={Icons}
                                        month={ethNav.month}
                                        monthList={labels.ethiopianMonths || ETHIOPIAN_MONTHS_AM}
                                        onMonthChange={(m) => setEthNav(n => ({ ...n, month: m }))}
                                        badge={isPagume
                                            ? <span className="eth-dp-pagume-badge">{pagumeDay}{labels.pagumeSuffix || 'ቀ'}</span>
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
                                        <div className="eth-dp-pagume-info">
                                            ፓጉሜ {pagumeDay} ቀናት አሉት
                                            {pagumeDay === 6 ? ' · ዘመነ ዮሐንስ' : ' · ዘመነ ማቴዎስ / ማርቆስ / ሉቃስ'}
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

                        <div className={cn("eth-dp-footer", classes.footer)} style={{ borderColor: 'var(--dp-border)', backgroundColor: 'var(--dp-bg-alt)' }}>
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
                                className="eth-dp-today-btn"
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
                                <div className="eth-dp-values-compact" style={{ backgroundColor: 'var(--dp-bg)', borderColor: 'var(--dp-border)' }}>
                                    <div className="eth-dp-val-row">
                                        <span className="eth-dp-val-label">Eth</span>
                                        <span className="eth-dp-val-text" style={{ color: 'var(--dp-accent)' }}>
                                            {formatEthDate(selectedEth).split('፣')[0]}
                                        </span>
                                    </div>
                                    <div className="eth-dp-val-row">
                                        <span className="eth-dp-val-label">Greg</span>
                                        <span className="eth-dp-val-text eth-dp-muted">
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
                .eth-dp-theme-root [type="button"] { cursor: pointer; transition: all 0.15s; font-family: inherit; }
                .eth-dp-theme-root [type="button"]:hover { filter: brightness(1.1); }
                .eth-dp-theme-root [type="button"]:active { scale: 0.97; }
                
                .eth-dp-trigger-container { position: relative; width: 100%; display: flex; flex-direction: column; }
                .eth-dp-label { display: block; text-size: 11px; font-weight: 700; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dp-text-muted); }
                
                .eth-dp-trigger { display: flex; align-items: center; border: 1px solid; text-align: left; transition: all 0.2s; outline: none; width: 100%; gap: 10px; }
                .eth-dp-trigger-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .eth-dp-disabled { opacity: 0.5; cursor: not-allowed !important; }
                .eth-dp-size-sm { padding: 6px 12px; font-size: 12px; border-radius: 8px; }
                .eth-dp-size-md { padding: 10px 16px; font-size: 14px; border-radius: 12px; }
                .eth-dp-size-lg { padding: 14px 20px; font-size: 16px; border-radius: 16px; }
                
                .eth-dp-clear-btn { padding: 2px; border-radius: 4px; display: flex; align-items: center; }
                .eth-dp-clear-btn:hover { background: rgba(255,255,255,0.1); }
                
                .eth-dp-dropdown { border-radius: 16px; border: 1px solid; box-shadow: 0 10px 40px rgba(0,0,0,0.4); overflow: hidden; display: flex; flex-direction: column; }
                
                .eth-dp-tabs { display: flex; align-items: center; justify-content: space-between; padding: 10px 16px; border-bottom: 1px solid; }
                .eth-dp-tabs-group { display: flex; border-radius: 8px; padding: 2px; gap: 2px; }
                .eth-dp-tab { padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; border: none; }
                .eth-dp-tab-switch { width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: none; }
                
                .eth-dp-cal-body { padding: 16px; }
                
                .eth-dp-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
                .eth-dp-nav-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 8px; border: none; }
                .eth-dp-nav-btn:hover { background: rgba(255,255,255,0.1); }
                .eth-dp-picker-group { display: flex; align-items: center; gap: 4px; }
                .eth-dp-rel { position: relative; }
                .eth-dp-picker-btn { font-size: 12px; font-weight: 700; padding: 4px 10px; border-radius: 8px; border: none; display: flex; align-items: center; gap: 4px; }
                .eth-dp-badge-wrapper { display: inline-flex; }
                
                .eth-dp-list-dropdown { position: absolute; z-index: 50; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 4px; overflow-y: auto; border-radius: 12px; border: 1px solid; box-shadow: 0 10px 25px rgba(0,0,0,0.3); max-height: 180px; scrollbar-width: thin; }
                .eth-dp-month-list { width: 120px; }
                .eth-dp-year-list { width: 100px; }
                .eth-dp-list-item { width: 100%; padding: 8px; font-size: 12px; text-align: center; border: none; background: transparent; }
                .eth-dp-list-item:hover { background: rgba(255,255,255,0.1); }
                
                .eth-dp-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
                .eth-dp-weekday { text-align: center; font-weight: 700; font-size: 10px; height: 24px; display: flex; align-items: center; justify-content: center; opacity: 0.8; }
                .eth-dp-day { height: 36px; border-radius: 8px; font-size: 14px; font-weight: 500; border: none; display: flex; align-items: center; justify-content: center; }
                .eth-dp-day-selected { font-weight: 700; scale: 1.05; }
                .eth-dp-day-empty { height: 36px; }
                
                .eth-dp-pagume-badge { font-size: 10px; background: rgba(251, 191, 36, 0.1); border: 1px solid rgba(251, 191, 36, 0.2); padding: 2px 4px; border-radius: 99px; color: #fbbf24; }
                .eth-dp-pagume-info { margin-top: 12px; border-radius: 8px; border: 1px solid rgba(251, 191, 36, 0.2); padding: 8px 12px; font-size: 11px; text-align: center; background: rgba(251, 191, 36, 0.1); color: #fbbf24; }
                
                .eth-dp-footer { padding: 12px 16px; border-top: 1px solid; display: flex; align-items: center; justify-content: space-between; gap: 12px; }
                .eth-dp-today-btn { font-size: 11px; font-weight: 700; padding: 6px 12px; border-radius: 8px; border: 1px solid; display: flex; align-items: center; gap: 6px; }
                .eth-dp-values-compact { border-radius: 12px; border: 1px solid; padding: 8px; display: flex; flex-direction: column; gap: 4px; min-width: 140px; }
                .eth-dp-val-row { display: flex; justify-content: space-between; align-items: center; gap: 8px; overflow: hidden; }
                .eth-dp-val-label { font-size: 9px; font-weight: 900; text-transform: uppercase; opacity: 0.3; }
                .eth-dp-val-text { font-size: 10px; font-weight: 700; white-space: nowrap; }
                .eth-dp-muted { color: #9ca3af; }
                
                @keyframes dpIn {
                    from { opacity: 0; transform: translateY(-8px) scale(0.97); }
                    to   { opacity: 1; transform: translateY(0) scale(1); }
                }
            `}</style>
        </div>
    );
}
