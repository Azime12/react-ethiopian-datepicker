# 🇪🇹 Ethiopian Date Picker - Documentation

A professional, dual-calendar React component for handling Ethiopian (ዓ.ም) and Gregorian (G.C.) dates with 100% UI customizability.

---

## 🚀 Quick Start

```jsx
import EthiopianDatePicker from './components/EthiopianDatePicker';

function MyForm() {
    const [date, setDate] = useState(null);

    return (
        <EthiopianDatePicker 
            value={date} 
            onChange={setDate} 
            label="የሹመት ቀን"
        />
    );
}
```

---

## 📖 Component API

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **`value`** | `Date \| null` | `null` | The currently selected JS Date object. |
| **`onChange`** | `(Date) => void` | `undefined` | Callback fired when a date is selected or cleared. |
| **`label`** | `string` | `undefined` | Optional text label shown above the input. |
| **`placeholder`** | `string` | `'ቀን ይምረጡ…'` | Text shown when no date is selected. |
| **`defaultCalendar`** | `'ethiopian' \| 'gregorian'` | `'ethiopian'` | Which calendar tab is active by default. |
| **`disabled`** | `boolean` | `false` | Prevents user interaction if true. |
| **`customization`** | `Object` | `{}` | The primary object for all UI/UX overrides. |

---

## 🎨 Customization Props

The `customization` object is divided into four sections:

### 1. `colors` (Theming)
Map your brand colors directly to the UI elements.
```javascript
customization={{
  colors: {
    primary: '#7c3aed',         // The main accent color
    background: '#111827',      // Popup background
    backgroundAlt: '#00000033', // Tab bar & input background
    border: '#ffffff1a',        // Lines and separators
    text: '#f3f4f6',            // Primary numbers/text
    textMuted: '#9ca3af',       // Labels & weekdays
    accent: '#a78bfa',          // Highlights & Icons
    selectedBg: '#7c3aed',      // Background of chosen date
    todayRing: '#a78bfa',       // Border color for "Today"
  }
}}
```

### 2. `config` (Functional)
Control the behavior and size of the component.
```javascript
customization={{
  config: {
    inputSize: 'sm' | 'md' | 'lg', // Size presets
    dropdownWidth: 320,            // Width in pixels
    fontSize: '14px',              // Global font size
    fontFamily: 'system-ui',       // Global font family
    hideClear: false,              // Hide the 'X' clear button
    hideSwitch: false,             // Hide the quick-toggle icon
    yearRangeEth: [2010, 2011...], // Custom year array
    icons: {                       // Override Lucide icons
      Calendar, X, Switch, ChevronLeft, ChevronRight 
    }
  }
}}
```

### 3. `labels` (Localization)
Change any text in the UI to any language.
```javascript
customization={{
  labels: {
    ethTab: 'ኢትዮጵያ',
    gregTab: 'Gregorian',
    ethiopianMonths: [...], // Array of 13 month names
    gregorianMonths: [...], // Array of 12 month names
  }
}}
```

### 4. `classes` (CSS/Tailwind)
Inject custom classes for deep CSS control.
- `container`, `trigger`, `dropdown`, `dayCell`, `header`, `weekday`, `footer`

---

## 🌟 Advanced Theme Example (Pure Light)

```jsx
<EthiopianDatePicker
  customization={{
    colors: {
      background: '#ffffff',
      text: '#1e293b',
      textMuted: '#64748b',
      border: '#e2e8f0',
      primary: '#4f46e5',
      backgroundAlt: '#f8fafc'
    },
    config: { inputSize: 'md' }
  }}
/>
```

---

## 🛠 Features
- **Pagume Support**: Automatically handles the 13th month of the Ethiopian calendar.
- **Leap Year Logic**: Accurate conversion between Julian (Ethiopian) and Gregorian.
- **Portal Rendering**: Dropdown renders at the end of `<body>` to avoid overflow clipping.
- **Responsive**: Adapts to screen edges automatically.
