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
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!onChange) return;
    
    const val = type === 'number' 
      ? e.target.value === '' 
        ? 0 
        : parseFloat(e.target.value) || 0 
      : e.target.value;
    
    onChange(val);
  };

  const inputClasses = [
    'w-full',
    'px-3',
    'py-2',
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
    'transition-colors duration-200',
    readOnly ? 'bg-gray-100 dark:bg-custom-dark-bg' : '',
  ].filter(Boolean).join(' ');

  return (
    <div className="flex items-center justify-between gap-4">
      {label && (
        <div className="flex items-center gap-1">
          <label className="text-sm font-medium text-custom-text dark:text-custom-dark-text whitespace-nowrap">
            {label}
          </label>
          {tooltip && (
            <Tooltip text={tooltip}>
              <Info className="w-4 h-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 cursor-help" />
            </Tooltip>
          )}
        </div>
      )}
      <div className="relative flex-1 max-w-[200px]">
        <input
          type={type}
          value={value || ''}
          onChange={handleChange}
          placeholder={placeholder ?? (type === 'number' ? '0' : '')}
          readOnly={readOnly}
          className={inputClasses}
        />
        {symbol && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <span className="text-custom-text dark:text-custom-dark-text">{symbol}</span>
          </div>
        )}
      </div>
    </div>
  );
};