import React from 'react';
import { useCalculator } from '../context/CalculatorContext';
import { InputField } from './InputField';
import { Settings } from 'lucide-react';

export const AdvancedSettings: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { settings, updateSettings } = useCalculator();

  const tooltips = {
    listingFee: "Fee charged when listing an item (per listing)",
    transactionFeeRate: "Percentage of total sale amount charged by Etsy",
    paymentFeeRate: "Percentage fee for payment processing",
    paymentFeeFixed: "Fixed fee charged per transaction",
    offsiteAdsRate: "Fee charged when a sale comes from Etsy's offsite ads",
    vatRate: "Value Added Tax rate for your region"
  };

  return (
    <div className="space-y-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors"
      >
        <Settings className="w-4 h-4" />
        {isOpen ? 'Hide Advanced Settings' : 'Show Advanced Settings'}
      </button>
      
      {isOpen && (
        <div className="bg-white dark:bg-custom-dark-surface rounded-xl shadow-md p-6 border-t-4 border-gray-400 animate-fadeIn transition-colors duration-200">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4 text-custom-text dark:text-custom-dark-text">Etsy Fees</h3>
            <div className="space-y-4">
              {[
                { label: 'Listing Fee', key: 'listingFee', symbol: '€' },
                { label: 'Transaction Fee', key: 'transactionFeeRate', symbol: '%', multiplier: 100 },
                { label: 'Payment Processing Fee', key: 'paymentFeeRate', symbol: '%', multiplier: 100 },
                { label: 'Payment Fixed Fee', key: 'paymentFeeFixed', symbol: '€' },
                { label: 'Offsite Ads Fee', key: 'offsiteAdsRate', symbol: '%', multiplier: 100 }
              ].map((item) => (
                <div key={item.key} className="flex justify-between items-center">
                  <span className="text-custom-text dark:text-custom-dark-text">{item.label}</span>
                  <div className="flex-1 max-w-[200px]">
                    <InputField
                      label=""
                      type="number"
                      value={item.multiplier ? settings[item.key] * item.multiplier : settings[item.key]}
                      onChange={(value) => updateSettings(item.key, item.multiplier ? value / item.multiplier : value)}
                      symbol={item.symbol}
                      tooltip={tooltips[item.key]}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4 mt-6">
            <h3 className="text-xl font-semibold mb-4 text-custom-text dark:text-custom-dark-text">Tax Settings</h3>
            <div className="flex justify-between items-center">
              <span className="text-custom-text dark:text-custom-dark-text">VAT Rate</span>
              <div className="flex-1 max-w-[200px]">
                <InputField
                  label=""
                  type="number"
                  value={settings.vatRate * 100}
                  onChange={(value) => updateSettings('vatRate', value / 100)}
                  symbol="%"
                  tooltip={tooltips.vatRate}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};