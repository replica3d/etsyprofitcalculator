import React from 'react';
import { Info } from 'lucide-react';
import { Tooltip } from './Tooltip';

interface InputFieldProps {
  label: string;
  type: 'text' | 'number';
  value: string | number;
  onChange?: (value: any) => void;
  readOnly?: boolean;
  symbol?: string;
  placeholder?: string;
  tooltip?: string;
}

export const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  type, 
  value, 
  onChange, 
  readOnly, 
  symbol,
  placeholder,
  tooltip
}) => {
  const id = React.useId();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    
    if (type === 'number') {
      const inputValue = e.target.value;
      // Handle empty string, "0." and regular numbers
      if (inputValue === '' || inputValue === '0.') {
        onChange(inputValue);
      } else {
        const numValue = parseFloat(inputValue);
        onChange(isNaN(numValue) ? 0 : numValue);
      }
    } else {
      onChange(e.target.value);
    }
  };

  const inputClasses = [
    'w-full',
    'px-2',
    'py-1.5',
    'sm:px-3',
    'sm:py-2',
    'border',
    'rounded-md',
    'shadow-sm',
    'focus:ring-1',
    'focus:ring-blue-500',
    'focus:border-blue-500',
    'dark:border-[rgb(105,105,105)]',
    'dark:focus:ring-blue-400',
    'dark:focus:border-blue-400',
    'bg-white dark:bg-[rgb(45,45,45)]',
    'text-custom-text dark:text-custom-dark-text',
    'text-sm sm:text-base',
    'transition-colors duration-200',
    readOnly ? 'bg-gray-100 dark:bg-custom-dark-bg' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="flex items-center justify-between gap-2 sm:gap-4">
      {label && (
        <div className="flex items-center gap-1 flex-shrink-0">
          <label 
            htmlFor={id} 
            className="text-xs sm:text-sm font-medium text-custom-text dark:text-custom-dark-text whitespace-nowrap"
          >
            {label}
          </label>
          {tooltip && (
            <Tooltip text={tooltip}>
              <span className="inline-flex">
                <Info 
                  className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 cursor-help" 
                  aria-hidden="true"
                />
              </span>
            </Tooltip>
          )}
        </div>
      )}
      <div className="relative flex-1 max-w-[120px] sm:max-w-[200px] ml-auto">
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          readOnly={readOnly}
          className={inputClasses}
          aria-label={label}
          name={label.toLowerCase().replace(/\s+/g, '-')}
        />
        {symbol && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:pr-3 pointer-events-none">
            <span 
              className="text-sm sm:text-base text-custom-text dark:text-custom-dark-text" 
              aria-hidden="true"
            >
              {symbol}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};