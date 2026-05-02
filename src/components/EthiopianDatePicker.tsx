/// <reference types="react" />
import * as React from 'react';
import { useState, useEffect, useRef, useCallback, ReactNode } from 'react';
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
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
);
const ChevronRightIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
);
const CalendarIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>
);
const XIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);
const SwitchIcon = ({ size = 16 }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 16 4 4 4-4" /><path d="M7 20V4" /><path d="m21 8-4-4-4 4" /><path d="M17 4v16" /></svg>
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

interface DayCellProps {
    label?: string | number;
    isToday?: boolean;
    isSelected?: boolean;
    isEmpty?: boolean;
    onClick?: () => void;
    customClasses?: { base?: string };
}

const DayCell: React.FC<DayCellProps> = ({ label, isToday, isSelected, isEmpty, onClick, customClasses = {} }) => {
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

    const Prev = Icons.ChevronLeft || ChevronLeftIcon;
    const Next = Icons.ChevronRight || ChevronRightIcon;

    return (
        <div className={cn('eth-dp-header', customClasses.container)}>
            <button
                type="button"
                onClick={onPrev}
                className={cn("eth-dp-nav-btn", customClasses.navBtn)}
            >
                <Prev size={16} />
            </button>

            <div className="eth-dp-picker-group">
                {monthList.length > 0 && onMonthChange ? (
                    <div className="eth-dp-rel">
                        <button
                            type="button"
                            onClick={toggleMonth}
                            className={cn('eth-dp-picker-btn', customClasses.picker, monthOpen ? 'is-active' : '')}
                        >
                            {monthList[month - 1]} {badge && <span className="eth-dp-badge-wrapper">{badge}</span>} ▾
                        </button>
                        {monthOpen && (
                            <div
                                ref={monthListRef}
                                className={cn('eth-dp-list-dropdown eth-dp-month-list', customClasses.dropdown)}
                            >
                                {monthList.map((name, idx) => (
                                    <button
                                        key={idx}
                                        type="button"
                                        data-selected={idx + 1 === month ? 'true' : 'false'}
                                        onClick={() => { onMonthChange(idx + 1); setMonthOpen(false); }}
                                        className={cn('eth-dp-list-item', idx + 1 === month ? 'is-active' : '')}
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
                            className={cn('eth-dp-picker-btn', customClasses.picker, yearOpen ? 'is-active' : '')}
                        >
                            {year}{yearSuffix} ▾
                        </button>
                        {yearOpen && (
                            <div
                                ref={yearListRef}
                                className={cn('eth-dp-list-dropdown eth-dp-year-list', customClasses.dropdown)}
                            >
                                {yearRange.map(y => (
                                    <button
                                        key={y}
                                        type="button"
                                        data-selected={y === year ? 'true' : 'false'}
                                        onClick={() => { onYearChange(y); setYearOpen(false); }}
                                        className={cn('eth-dp-list-item', y === year ? 'is-active' : '')}
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
                <div key={d} className={cn("eth-dp-weekday", customClasses.weekday)}>{d}</div>
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
                <div key={d} className={cn("eth-dp-weekday", customClasses.weekday)}>{d}</div>
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

        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const estimatedDropHeight = 380; // Approximate height of the calendar dropdown

        let topPosition = rect.bottom + window.scrollY + 6;

        // If there is not enough space below, and there is more space above than below, flip it up
        if (spaceBelow < estimatedDropHeight && spaceAbove > spaceBelow) {
            topPosition = rect.top + window.scrollY - estimatedDropHeight - 6;

            // Prevent it from clipping off the very top of the document
            if (topPosition < window.scrollY + 6) {
                topPosition = window.scrollY + 6;
            }
        }

        setStyle({
            position: 'absolute',
            top: topPosition,
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
        '--dp-bg': colors.background || '#ffffff',
        '--dp-bg-alt': colors.backgroundAlt || '#f8fafc',
        '--dp-border': colors.border || '#e5e7eb',
        '--dp-text': colors.text || '#111827',
        '--dp-text-muted': colors.textMuted || '#6b7280',
        '--dp-accent': colors.accent || '#7c3aed',
        '--dp-today-ring': colors.todayRing || '#7c3aed',
        '--dp-selected-bg': colors.selectedBg || '#7c3aed',
        '--dp-selected-shadow': colors.selectedShadow || 'rgba(124, 58, 237, 0.4)',
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
                        classes.trigger,
                        open ? 'is-open' : ''
                    )}
                >
                    <Calendar size={18} className="eth-dp-trigger-icon" />
                    <span className="eth-dp-trigger-text">
                        {displayLabel || placeholder}
                    </span>
                    {value && !disabled && !config.hideClear && (
                        <span
                            role="button"
                            tabIndex={0}
                            onClick={handleClear}
                            className="eth-dp-clear-btn"
                        >
                            <X size={16} />
                        </span>
                    )}
                </button>
            </div>

            {open && (
                <DropdownPortal anchorRef={triggerRef} dropW={config.dropdownWidth || 316}>
                    <div
                        data-eth-dp="true"
                        className={cn("eth-dp-theme-root eth-dp-dropdown", classes.dropdown)}
                        style={{ ...themeStyles, animation: 'dpIn 0.15s ease-out both' } as any}
                    >
                        <div className="eth-dp-tabs">
                            <div className="eth-dp-tabs-group">
                                <button
                                    type="button"
                                    onClick={() => setCalType('ethiopian')}
                                    className={cn('eth-dp-tab', calType === 'ethiopian' ? 'is-active' : '')}
                                >
                                    {labels.ethTab || '🇪🇹 ኢትዮጵያ'}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setCalType('gregorian')}
                                    className={cn('eth-dp-tab', calType === 'gregorian' ? 'is-active' : '')}
                                >
                                    {labels.gregTab || '🌍 Gregorian'}
                                </button>
                            </div>
                            {!config.hideSwitch && (
                                <button
                                    type="button"
                                    onClick={() => setCalType(c => c === 'ethiopian' ? 'gregorian' : 'ethiopian')}
                                    className="eth-dp-tab-switch"
                                >
                                    <Switch size={14} />
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

                        <div className={cn("eth-dp-footer", classes.footer)}>
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
                            >
                                <CalendarIcon size={14} />
                                {labels.today || 'ዛሬ (Today)'}
                            </button>
                        </div>
                    </div>
                </DropdownPortal>
            )}

            <style>{`
                .eth-dp-theme-root {
                    --dp-p: var(--dp-primary);
                    --dp-pa: var(--dp-primary-alpha);
                    --dp-b: var(--dp-bg);
                    --dp-ba: var(--dp-bg-alt);
                    --dp-br: var(--dp-border);
                    --dp-t: var(--dp-text);
                    --dp-tm: var(--dp-text-muted);
                    --dp-ac: var(--dp-accent);
                    --dp-tr: var(--dp-today-ring);
                    --dp-sb: var(--dp-selected-bg);
                    --dp-ss: var(--dp-selected-shadow);
                }
                .eth-dp-theme-root * { box-sizing: border-box; }
                .eth-dp-theme-root [type="button"] { cursor: pointer; transition: all 0.15s; font-family: inherit; border: none; background: transparent; }
                
                .eth-dp-trigger-container { position: relative; width: 100%; display: flex; flex-direction: column; }
                .eth-dp-label { display: block; font-size: 11px; font-weight: 700; margin-bottom: 6px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--dp-tm); }
                
                .eth-dp-trigger { display: flex; align-items: center; border: 1px solid var(--dp-br); text-align: left; transition: all 0.2s; outline: none; width: 100%; gap: 10px; background: var(--dp-b); color: var(--dp-t); }
                .eth-dp-trigger.is-open { border-color: var(--dp-p); box-shadow: 0 0 0 3px var(--dp-pa); }
                .eth-dp-trigger-icon { color: var(--dp-tm); }
                .eth-dp-trigger-text { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
                .eth-dp-disabled { opacity: 0.5; cursor: not-allowed !important; }
                .eth-dp-size-sm { padding: 6px 10px; font-size: 13px; border-radius: 6px; }
                .eth-dp-size-md { padding: 10px 14px; font-size: 14px; border-radius: 8px; }
                .eth-dp-size-lg { padding: 14px 18px; font-size: 16px; border-radius: 12px; }
                
                .eth-dp-clear-btn { padding: 4px; border-radius: 4px; display: flex; align-items: center; color: var(--dp-tm); }
                .eth-dp-clear-btn:hover { background: var(--dp-ba); color: var(--dp-t); }
                
                .eth-dp-dropdown { border-radius: 12px; border: 1px solid var(--dp-br); box-shadow: 0 10px 25px -5px rgba(0,0,0,0.1); background: var(--dp-b); color: var(--dp-t); overflow: hidden; display: flex; flex-direction: column; }
                
                .eth-dp-tabs { display: flex; align-items: center; justify-content: space-between; padding: 10px; border-bottom: 1px solid var(--dp-br); background: var(--dp-ba); }
                .eth-dp-tabs-group { display: flex; background: var(--dp-br); border-radius: 6px; padding: 2px; gap: 2px; }
                .eth-dp-tab { padding: 4px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; color: var(--dp-tm); }
                .eth-dp-tab.is-active { background: var(--dp-b); color: var(--dp-p); box-shadow: 0 1px 2px rgba(0,0,0,0.05); }
                .eth-dp-tab-switch { width: 30px; height: 30px; display: flex; align-items: center; justify-content: center; border-radius: 6px; color: var(--dp-tm); }
                .eth-dp-tab-switch:hover { background: var(--dp-br); color: var(--dp-t); }
                
                .eth-dp-cal-body { padding: 14px; }
                
                .eth-dp-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
                .eth-dp-nav-btn { width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 6px; color: var(--dp-tm); }
                .eth-dp-nav-btn:hover { background: var(--dp-ba); color: var(--dp-t); }
                .eth-dp-picker-group { display: flex; align-items: center; gap: 4px; }
                .eth-dp-rel { position: relative; }
                .eth-dp-picker-btn { font-size: 13px; font-weight: 700; padding: 4px 8px; border-radius: 6px; color: var(--dp-t); }
                .eth-dp-picker-btn.is-active { background: var(--dp-pa); color: var(--dp-p); }
                
                .eth-dp-list-dropdown { position: absolute; z-index: 50; top: 100%; left: 50%; transform: translateX(-50%); margin-top: 4px; overflow-y: auto; border-radius: 8px; border: 1px solid var(--dp-br); background: var(--dp-b); box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1); max-height: 200px; }
                .eth-dp-month-list { width: 130px; }
                .eth-dp-year-list { width: 100px; }
                .eth-dp-list-item { width: 100%; padding: 8px; font-size: 13px; text-align: center; color: var(--dp-t); }
                .eth-dp-list-item:hover { background: var(--dp-ba); }
                .eth-dp-list-item.is-active { background: var(--dp-p); color: #fff; }
                
                .eth-dp-grid { display: grid; grid-template-columns: repeat(7, 1fr); gap: 2px; }
                .eth-dp-weekday { text-align: center; font-weight: 700; font-size: 11px; height: 30px; display: flex; align-items: center; justify-content: center; color: var(--dp-tm); }
                .eth-dp-day { height: 38px; border-radius: 6px; font-size: 14px; font-weight: 500; color: var(--dp-t); display: flex; align-items: center; justify-content: center; position: relative; }
                .eth-dp-day:hover:not(.eth-dp-day-empty) { background: var(--dp-ba); }
                .eth-dp-day-selected { background: var(--dp-sb) !important; color: #fff !important; font-weight: 700; box-shadow: 0 4px 10px var(--dp-ss); }
                .eth-dp-day-empty { height: 38px; }
                
                .eth-dp-pagume-badge { font-size: 10px; background: #fef3c7; color: #b45309; padding: 1px 4px; border-radius: 4px; margin-left: 4px; font-weight: 800; }
                
                .eth-dp-footer { padding: 10px; border-top: 1px solid var(--dp-br); display: flex; align-items: center; justify-content: center; background: var(--dp-ba); }
                .eth-dp-today-btn { font-size: 12px; font-weight: 700; padding: 6px 16px; border-radius: 6px; border: 1px solid var(--dp-br); background: var(--dp-b); color: var(--dp-ac); display: flex; align-items: center; gap: 8px; }
                .eth-dp-today-btn:hover { border-color: var(--dp-ac); background: var(--dp-ba); }
                
                @keyframes dpIn {
                    from { opacity: 0; transform: translateY(-5px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}
