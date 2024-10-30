import React from 'react';
import Calculator from './components/Calculator';
import { CalculatorProvider } from './context/CalculatorContext';
import { Calculator as CalculatorIcon, Moon, Sun } from 'lucide-react';

function App() {
  const [darkMode, setDarkMode] = React.useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  // Get initial state from URL parameters
  const [initialState] = React.useState(() => {
    if (typeof window === 'undefined') return undefined;

    const params = new URLSearchParams(window.location.search);
    const settings: Record<string, number> = {};
    const inputs: Record<string, string | number> = {};

    // Parse parameters
    params.forEach((value, key) => {
      const numValue = Number(value);
      if (key.startsWith('s_')) {
        settings[key.slice(2)] = numValue;
      } else if (key.startsWith('i_')) {
        // Convert to number if it's a numeric field, keep as string for text fields
        inputs[key.slice(2)] = key.slice(2) === 'item' ? value : numValue;
      }
    });

    return Object.keys(settings).length || Object.keys(inputs).length
      ? { settings, inputs }
      : undefined;
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.theme = darkMode ? 'light' : 'dark';
  };

  React.useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = localStorage.theme;
    setDarkMode(theme === 'dark' || (!theme && isDark));
    if (theme === 'dark' || (!theme && isDark)) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  return (
    <CalculatorProvider initialState={initialState}>
      <div className="min-h-screen bg-gray-50 dark:bg-custom-dark-bg py-12 px-4 transition-colors duration-200">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="inline-flex items-center gap-2">
              <CalculatorIcon className="w-8 h-8 text-orange-500" />
              <div>
                <h1 className="text-3xl font-bold text-custom-text dark:text-custom-dark-text">
                  Etsy Profit Calculator
                </h1>
                <p className="text-custom-text dark:text-custom-dark-text-secondary">
                  Calculate your Etsy shop profits with precision
                </p>
              </div>
            </div>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-custom-dark-surface transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5 text-custom-dark-text" />
              ) : (
                <Moon className="w-5 h-5 text-custom-text" />
              )}
            </button>
          </div>
          <Calculator />
        </div>
      </div>
    </CalculatorProvider>
  );
}

export default App;