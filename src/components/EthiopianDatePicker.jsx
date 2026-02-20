import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ChevronLeft, ChevronRight, Calendar, X, ArrowLeftRight } from 'lucide-react';
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
    isEthLeapYear,
} from '../utils/calendar';

const cn = (...c) => c.filter(Boolean).join(' ');

function DayCell({ label, isToday, isSelected, isEmpty, onClick, customClasses = {} }) {
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
                boxShadow: isSelected ? '0 4px 12px var(--dp-selected-shadow)' : 'none',
                border: isToday && !isSelected ? '2px solid var(--dp-today-ring)' : 'none',
            }}
        >
            {label}
        </button>
    );
}

function CalendarHeader({
    onPrev, onNext,
    month, monthList = [], onMonthChange,
    badge,
    year, yearSuffix = '', yearRange = [], onYearChange,
    customClasses = {},
    Icons = {}
}) {
    const [monthOpen, setMonthOpen] = useState(false);
    const [yearOpen, setYearOpen] = useState(false);
    const monthListRef = useRef(null);
    const yearListRef = useRef(null);

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

    const pickerBtnStyle = (isOpen) => ({
        backgroundColor: isOpen ? 'var(--dp-primary)' : 'var(--dp-primary-alpha)',
        color: isOpen ? '#fff' : 'var(--dp-accent)'
    });

    const itemStyle = (active) => ({
        backgroundColor: active ? 'var(--dp-primary)' : 'transparent',
        color: active ? '#fff' : 'var(--dp-text)'
    });

    const dropdownCls = cn('absolute z-50 top-full left-1/2 -translate-x-1/2 mt-1 overflow-y-auto rounded-xl border shadow-2xl', customClasses.dropdown);

    return (
        <div className={cn('flex items-center justify-between mb-3', customClasses.container)}>
            <button
                type="button"
                onClick={onPrev}
                className={cn("w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-white/10", customClasses.navBtn)}
                style={{ color: 'var(--dp-text-muted)' }}
            >
                <Icons.ChevronLeft size={16} />
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
                                }}
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
                                }}
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
                <Icons.ChevronRight size={16} />
            </button>
        </div>
    );
}

function EthGrid({ year, month, selectedEth, todayEth, onSelect, labels = {}, customClasses = {} }) {
    const firstDay = getEthFirstDay(year, month);
    const totalDays = getDaysInEthMonth(year, month);
    const dayLabels = labels.days || ETHIOPIAN_DAYS_AM;

    const cells = [];
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
                        isToday={todayEth && day === todayEth.day && month === todayEth.month && year === todayEth.year}
                        isSelected={selectedEth && day === selectedEth.day && month === selectedEth.month && year === selectedEth.year}
                        onClick={() => onSelect(year, month, day)}
                    />
                )
            )}
        </div>
    );
}

function GregGrid({ year, month, selectedDate, today, onSelect, labels = {}, customClasses = {} }) {
    const firstDay = getGregorianFirstDay(year, month);
    const totalDays = getDaysInGregorianMonth(year, month);
    const dayLabels = labels.days || GREGORIAN_DAYS_EN;

    const cells = [];
    for (let i = 0; i < firstDay; i++)   cells.push(null);
    for (let d = 1; d <= totalDays; d++) cells.push(d);

    const same = (d, ref) => ref && d === ref.getDate() && month === ref.getMonth() + 1 && year === ref.getFullYear();

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
                        isToday={same(day, today)}
                        isSelected={same(day, selectedDate)}
                        onClick={() => onSelect(new Date(year, month - 1, day))}
                    />
                )
            )}
        </div>
    );
}

function DropdownPortal({ anchorRef, children, dropW = 316 }) {
    const [style, setStyle] = useState({});

    useEffect(() => {
        if (!anchorRef.current) return;
        const rect = anchorRef.current.getBoundingClientRect();
        let left = rect.left + window.scrollX;
        if (left + dropW > window.innerWidth - 8) left = window.innerWidth - dropW - 8;
        setStyle({
            position: 'absolute',
            top: rect.bottom + window.scrollY + 6,
            left,
            width: dropW,
            zIndex: 99999,
        });
    }, [anchorRef, dropW]);

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
}) {
    const { labels = {}, classes = {}, config = {}, colors = {} } = customization;

    const Icons = {
        Calendar: config.icons?.Calendar || Calendar,
        X: config.icons?.X || X,
        ChevronLeft: config.icons?.ChevronLeft || ChevronLeft,
        ChevronRight: config.icons?.ChevronRight || ChevronRight,
        Switch: config.icons?.Switch || ArrowLeftRight,
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
    };

    const todayJS = new Date();
    const todayEth = dateToEth(todayJS);

    const [open, setOpen] = useState(false);
    const [calType, setCalType] = useState(defaultCalendar);
    const [pinnedEth, setPinnedEth] = useState(null);

    const initEth = value ? dateToEth(value) : todayEth;
    const [ethNav, setEthNav] = useState({ year: initEth.year, month: initEth.month });
    const [gregNav, setGregNav] = useState({
        year: value ? value.getFullYear() : todayJS.getFullYear(),
        month: value ? value.getMonth() + 1 : todayJS.getMonth() + 1,
    });

    const triggerRef = useRef(null);

    useEffect(() => {
        if (!open) return;
        const handle = (e) => {
            if (triggerRef.current?.contains(e.target)) return;
            if (e.target.closest('[data-eth-dp]')) return;
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
    }, [value]);

    const selectedEth = pinnedEth ?? (value ? dateToEth(value) : null);

    const handleEthSelect = useCallback((y, m, d) => {
        const eth = { year: y, month: m, day: d };
        setPinnedEth(eth);
        setEthNav({ year: y, month: m });
        onChange?.(ethToDate(y, m, d));
        setOpen(false);
    }, [onChange]);

    const handleGregSelect = useCallback((date) => {
        setPinnedEth(null);
        setGregNav({ year: date.getFullYear(), month: date.getMonth() + 1 });
        onChange?.(date);
        setOpen(false);
    }, [onChange]);

    const handleClear = (e) => {
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
                        boxShadow: open ? '0 0 0 4px var(--dp-primary-alpha)' : 'none'
                    }}
                >
                    <Icons.Calendar size={config.inputSize === 'sm' ? 13 : 15} style={{ color: 'var(--dp-accent)' }} className="shrink-0" />
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
                            <Icons.X size={config.inputSize === 'sm' ? 12 : 14} />
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
                        }}
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
                                    <Icons.Switch size={13} />
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

                        {value && selectedEth && (
                            <div className={cn("px-4 pb-4 pt-3 border-t", classes.footer)} style={{ borderColor: 'var(--dp-border)', backgroundColor: 'var(--dp-bg-alt)' }}>
                                <div className="rounded-xl border p-3 space-y-1.5" style={{ backgroundColor: 'var(--dp-primary-alpha)', borderColor: 'var(--dp-primary-alpha)' }}>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--dp-text-muted)' }}>
                                            {labels.ethTab?.replace(/[^\w\s]/gi, '') || 'ኢትዮጵያ'}
                                        </span>
                                        <span className="text-xs font-semibold" style={{ color: 'var(--dp-accent)' }}>
                                            {formatEthDate(selectedEth)}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between gap-2">
                                        <span className="text-[10px] uppercase tracking-wider" style={{ color: 'var(--dp-text-muted)' }}>
                                            {labels.gregTab?.replace(/[^\w\s]/gi, '') || 'Gregorian'}
                                        </span>
                                        <span className="text-xs font-semibold" style={{ color: 'var(--dp-text)' }}>
                                            {formatGregDate(value)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
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
