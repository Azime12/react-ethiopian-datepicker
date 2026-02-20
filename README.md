# 🇪🇹 react-ethiopian-datepicker

A professional, high-performance, and high-customizability dual-calendar React component for **Ethiopian (ዓ.ም)** and **Gregorian (G.C.)** dates.

[![NPM Version](https://img.shields.io/npm/v/react-ethiopian-datepicker)](https://www.npmjs.com/package/react-ethiopian-datepicker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub Stars](https://img.shields.io/github/stars/Azime12/react-ethiopian-datepicker)](https://github.com/Azime12/react-ethiopian-datepicker)

## 📦 Installation

```bash
# This package requires lucide-react for icons
pnpm add react-ethiopian-datepicker lucide-react

# or
npm install react-ethiopian-datepicker lucide-react

# or
yarn add react-ethiopian-datepicker lucide-react
```

> **Why Lucide React?** To keep the package lightweight, we use `lucide-react` as a peer dependency. This prevents duplicate icon libraries in your final bundle.

> **Note**: This package can also be installed directly from GitHub if preferred:
> `npm install Azime12/react-ethiopian-datepicker`

## 🛠 Usage

```jsx
import { EthiopianDatePicker } from 'react-ethiopian-datepicker';
import 'react-ethiopian-datepicker/dist/style.css';

function Application() {
  const [date, setDate] = useState(null);

  return (
    <EthiopianDatePicker 
      value={date} 
      onChange={setDate} 
      label="Select Date"
      customization={{
        colors: {
           primary: '#4f46e5' // Set your brand color
        }
      }}
    />
  );
}
```

## 🎨 Professional Customization

The date picker provides deep access to styling via the `customization` prop:

- **Colors**: Change primary colors, backgrounds, text, and borders.
- **Sizes**: Choose between `sm`, `md`, or `lg` layouts.
- **Icons**: Pass your own React components to override default icons.
- **Labels**: Fully localize labels for months and days (Default: Amharic).

Check out [DATE_PICKER_DOC.md](https://github.com/Azime12/react-ethiopian-datepicker/blob/main/DATE_PICKER_DOC.md) for the full API.

## 🤝 Contributing

Contributions are welcome! Whether it's fixing a bug, adding a feature, or improving documentation. 

Please see [CONTRIBUTING.md](https://github.com/Azime12/react-ethiopian-datepicker/blob/main/CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/Azime12/react-ethiopian-datepicker/blob/main/LICENSE) file for details.
