# Frontend Documentation

## Overview

The frontend of Rede Vida Project is built using React 19.2.0 with Vite 7.3.1, featuring a modern component-based architecture with internationalization support and responsive design. This document provides comprehensive information about the frontend architecture, structure, and development guidelines.

## Architecture

### Component-Based Architecture

Our frontend follows a modular component-based architecture:

```bash
src/
├── components/
│   ├── pages/                      # Page components
│   │   ├── login/                  # Authentication
│   │   ├── donateNow/              # Donation flow
│   │   ├── about/                  # About page
│   │   ├── contact/                # Contact page
│   │   ├── location/               # Find donation centers
│   │   └── pageNotFund/            # 404 page
│   └── shared/                     # Reusable components
│       ├── header/                 # Navigation header
│       ├── footer/                 # Page footer
│       ├── loading/                # Loading components
│       ├── themeToggle/            # Theme switcher
│       └── ScrollAnimation/        # Animation utilities
├── locales/                        # Internationalization
│   ├── en/translation.json         # English translations
│   ├── pt/translation.json         # Portuguese translations
│   └── es/translation.json         # Spanish translations
├── i18n/                           # i18n configuration
│   └── i18n.js                    # Main i18n setup
├── assets/                         # Static assets
├── App.jsx                         # Main application component
├── main.jsx                        # Application entry point
├── App.css                         # Global styles
└── index.css                       # Base styles
```

### Architecture Principles

- **Component Reusability**: Build reusable, self-contained components
- **Separation of Concerns**: Clear separation between UI, logic, and styling
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG 2.1 compliance
- **Performance**: Optimized for fast loading and smooth interactions

## Technology Stack

### Core Technologies

- **React 19.2.0**: Modern React with latest features
- **Vite 7.3.1**: Fast build tool and development server
- **JavaScript (ES6+)**: Modern JavaScript features

### Styling & UI

- **TailwindCSS 3.4.19**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **Autoprefixer**: CSS vendor prefixing

### Routing & Navigation

- **React Router DOM 7.13.1**: Client-side routing
- **History API**: Browser history management

### Internationalization

- **i18next 25.8.17**: Internationalization framework
- **react-i18next**: React bindings for i18next

### Development Tools

- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **Vite Plugin**: Development and build optimization

## Project Structure

### Pages Components

Each page is a self-contained component with its own styles and logic:

```bash
pages/
├── home/
│   ├── Home.jsx                    # Home page component
│   ├── Home.css                    # Home page styles
│   └── index.js                    # Export file
├── login/
│   ├── Login.jsx                   # Login component
│   ├── Login.css                   # Login styles
│   └── index.js                    # Export file
├── donateNow/
│   ├── DonateNow.jsx               # Donation flow component
│   ├── Step1Donate.jsx             # Step 1 of donation
│   ├── Step2Donate.jsx             # Step 2 of donation
│   ├── Step3Donate.jsx             # Step 3 of donation
│   └── index.js                    # Export file
└── ...
```

### Shared Components

Reusable components used across the application:

```bash
shared/
├── header/
│   ├── Header.jsx                  # Header component
│   ├── Header.css                  # Header styles
│   └── index.js                    # Export file
├── footer/
│   ├── Footer.jsx                  # Footer component
│   ├── Footer.css                  # Footer styles
│   └── index.js                    # Export file
├── loading/
│   ├── Loading.jsx                 # Loading component
│   ├── Loading.css                 # Loading styles
│   └── index.js                    # Export file
├── themeToggle/
│   ├── ThemeToggle.jsx             # Theme toggle component
│   ├── ThemeToggle.css             # Theme toggle styles
│   └── index.js                    # Export file
└── ...
```

### Internationalization

Translation files organized by language:

```bash
locales/
├── en/
│   └── translation.json            # English translations
├── pt/
│   └── translation.json            # Portuguese translations
└── es/
    └── translation.json            # Spanish translations
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
cd rede-vida-UI
npm install
```

### Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Configuration

### Vite Configuration

```javascript
// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
```

### Package.json Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext js,jsx --fix",
    "format": "prettier --write \"src/**/*.{js,jsx,css,md}\""
  }
}
```

## Styling Guidelines

### TailwindCSS Configuration

```javascript
// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fef2f2',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
        },
        secondary: {
          50: '#f0f9ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
```

### CSS Architecture

```css
/* index.css - Base styles */
@tailwind base;
@tailwind components;
@tailwind utilities;

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

@layer base {
  html {
    scroll-behavior: smooth;
  }
  
  body {
    font-family: 'Inter', sans-serif;
  }
}

@layer components {
  .btn-primary {
    @apply bg-primary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-primary-700 transition-colors;
  }
  
  .btn-secondary {
    @apply bg-secondary-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-secondary-700 transition-colors;
  }
}
```

## Internationalization

### i18next Configuration

```javascript
// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from '../locales/en/translation.json';
import ptTranslations from '../locales/pt/translation.json';
import esTranslations from '../locales/es/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      pt: {
        translation: ptTranslations
      },
      es: {
        translation: esTranslations
      },
    },
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
```

### Using Translations

```jsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('home:title')}</h1>
      <p>{t('home:description')}</p>
    </div>
  );
}
```

## Responsive Design

### Breakpoints

```css
/* TailwindCSS default breakpoints */
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large devices */
2xl: 1536px /* 2X large devices */
```

### Mobile-First Approach

```jsx
function ResponsiveComponent() {
  return (
    <div className="container mx-auto px-4">
      {/* Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Content */}
      </div>
    </div>
  );
}
```

## Components

### Header Component

```jsx
// components/shared/header/Header.jsx
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ThemeToggle from '../themeToggle/ThemeToggle';

function Header() {
  const { t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img src="/logo.svg" alt="Rede Vida" className="h-8 w-auto" />
          </div>
          
          {/* Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-gray-700 hover:text-primary-600">
              {t('navigation:home')}
            </a>
            <a href="#about" className="text-gray-700 hover:text-primary-600">
              {t('navigation:about')}
            </a>
            <a href="#contact" className="text-gray-700 hover:text-primary-600">
              {t('navigation:contact')}
            </a>
          </div>
          
          {/* Actions */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <button className="btn-primary">
              {t('navigation:donate')}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
```

### Loading Component

```jsx
// components/shared/loading/Loading.jsx
function Loading({ size = 'medium' }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12'
  };
  
  return (
    <div className="flex justify-center items-center">
      <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-primary-600`}></div>
    </div>
  );
}

export default Loading;
```

## State Management

### Local State

For component-level state, we use React's built-in hooks:

```jsx
import { useState, useEffect } from 'react';

function UserProfile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    fetchUserProfile()
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching user:', error);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <Loading />;
  
  return <div>{/* User profile content */}</div>;
}
```

### Context API

For global state, we use React Context:

```jsx
// contexts/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };
  
  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
```

## API Integration

### API Service

```javascript
// services/api.js
const API_BASE_URL = 'http://localhost:8080/api/v1';

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }
  
  // User endpoints
  async getUsers() {
    return this.request('/users');
  }
  
  async getUserById(id) {
    return this.request(`/users/${id}`);
  }
  
  async createUser(userData) {
    return this.request('/users', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }
  
  // Donation center endpoints
  async getNearestCenters(lat, lng) {
    return this.request(`/centers/nearest?lat=${lat}&lng=${lng}`);
  }
}

export default new ApiService();
```

### Custom Hooks

```jsx
// hooks/useApi.js
import { useState, useEffect } from 'react';
import api from '../services/api';

export function useApi(endpoint, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await api.request(endpoint);
        
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err);
          setData(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, dependencies);
  
  return { data, loading, error };
}
```

## Testing

### Unit Testing with Jest

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

### Component Testing Example

```jsx
// components/__tests__/Button.test.jsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from '../shared/button/Button';

describe('Button Component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

## Performance Optimization

### Code Splitting

```jsx
// Lazy loading components
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/home/Home'));
const About = lazy(() => import('./pages/about/About'));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### Image Optimization

```jsx
// Optimized image component
function OptimizedImage({ src, alt, ...props }) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
}
```

## Development Guidelines

### Code Style

We use ESLint and Prettier for consistent code formatting:

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended"
  ],
  "rules": {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off"
  }
}
```

### Component Naming

- Use PascalCase for component names
- Be descriptive and concise
- Group related components in folders

### File Organization

- Group components by feature/page
- Use index.js files for clean imports
- Keep styles co-located with components

## Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [i18next Documentation](https://www.i18next.com/)
- [React Router Documentation](https://reactrouter.com/)

## Contributing

When contributing to the frontend:

1. Follow the existing component structure and naming conventions
2. Ensure responsive design for all new components
3. Add proper internationalization support
4. Write tests for new components
5. Update documentation for new features

For detailed contribution guidelines, see [CONTRIBUTING.md](./CONTRIBUTING.md).
