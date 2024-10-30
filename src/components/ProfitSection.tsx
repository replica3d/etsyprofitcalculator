import React from 'react';
import { useCalculator } from '../context/CalculatorContext';

export const ProfitSection: React.FC = () => {
  const { calculations } = useCalculator();

  const ProfitRow = ({ label, profit, margin }: { label: string; profit: number; margin: number }) => (
    <div className="grid grid-cols-[minmax(90px,1fr)_minmax(80px,auto)_minmax(70px,auto)] gap-2 py-3 border-b dark:border-custom-dark-border last:border-b-0">
      <div className="text-custom-text dark:text-custom-dark-text text-sm md:text-base whitespace-nowrap">{label}</div>
      <div className="text-right">
        <span className={`font-medium text-sm md:text-base ${profit >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          {profit.toFixed(2)}€
        </span>
      </div>
      <div className="text-right">
        <span className={`font-medium text-sm md:text-base ${margin >= 0 ? 'text-green-500 dark:text-green-400' : 'text-red-500 dark:text-red-400'}`}>
          {margin.toFixed(2)}%
        </span>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-custom-text dark:text-custom-dark-text">Profit Analysis</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        {/* EU Section */}
        <div className="bg-gray-50 dark:bg-custom-dark-bg rounded-lg p-4">
          <div className="mb-3">
            <h3 className="text-sm font-medium text-custom-text dark:text-custom-dark-text mb-1">With VAT (EU)</h3>
            <p className="text-xs text-gray-500 dark:text-custom-dark-text-secondary">Including VAT in calculations</p>
          </div>
          <div className="bg-white dark:bg-custom-dark-surface rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-[minmax(90px,1fr)_minmax(80px,auto)_minmax(70px,auto)] gap-2 pb-2 mb-2 border-b dark:border-custom-dark-border">
              <div className="text-sm font-medium text-custom-text dark:text-custom-dark-text">Type</div>
              <div className="text-right text-sm font-medium text-custom-text dark:text-custom-dark-text">Profit</div>
              <div className="text-right text-sm font-medium text-custom-text dark:text-custom-dark-text">Margin</div>
            </div>
            <ProfitRow 
              label="Standard" 
              profit={calculations.profitEU} 
              margin={calculations.profitMarginEU} 
            />
            <ProfitRow 
              label="From Offsite Ads" 
              profit={calculations.profitOAEU} 
              margin={calculations.profitMarginOAEU} 
            />
          </div>
        </div>

        {/* Non-EU Section */}
        <div className="bg-gray-50 dark:bg-custom-dark-bg rounded-lg p-4">
          <div className="mb-3">
            <h3 className="text-sm font-medium text-custom-text dark:text-custom-dark-text mb-1">Without VAT (Non-EU)</h3>
            <p className="text-xs text-gray-500 dark:text-custom-dark-text-secondary">Excluding VAT from calculations</p>
          </div>
          <div className="bg-white dark:bg-custom-dark-surface rounded-lg p-4 shadow-sm">
            <div className="grid grid-cols-[minmax(90px,1fr)_minmax(80px,auto)_minmax(70px,auto)] gap-2 pb-2 mb-2 border-b dark:border-custom-dark-border">
              <div className="text-sm font-medium text-custom-text dark:text-custom-dark-text">Type</div>
              <div className="text-right text-sm font-medium text-custom-text dark:text-custom-dark-text">Profit</div>
              <div className="text-right text-sm font-medium text-custom-text dark:text-custom-dark-text">Margin</div>
            </div>
            <ProfitRow 
              label="Standard" 
              profit={calculations.profitNONEU} 
              margin={calculations.profitMarginNONEU} 
            />
            <ProfitRow 
              label="From Offsite Ads" 
              profit={calculations.profitOANONEU} 
              margin={calculations.profitMarginOANONEU} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};