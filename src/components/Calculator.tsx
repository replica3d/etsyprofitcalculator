import React from 'react';
import { RevenueSection } from './RevenueSection';
import { EtsyFeesSection } from './EtsyFeesSection';
import { OtherCostsSection } from './OtherCostsSection';
import { ProfitSection } from './ProfitSection';
import { AdvancedSettings } from './AdvancedSettings';
import { Share, Check } from 'lucide-react';
import { useCalculator } from '../context/CalculatorContext';

const Calculator: React.FC = () => {
  const { calculations, settings, inputs } = useCalculator();
  const [copied, setCopied] = React.useState(false);

  const feeRatio = calculations.totalRevenue ? (calculations.totalFees / calculations.totalRevenue * 100) : 0;
  const totalFeeRate = settings.transactionFeeRate + settings.paymentFeeRate;
  const breakeven = calculations.baseCost > 0 ? 
    ((calculations.baseCost + settings.listingFee + settings.paymentFeeFixed) / 
    (1 - totalFeeRate)) - inputs.shippingPrice : 0;

  const containerClasses = "bg-white dark:bg-custom-dark-surface rounded-xl shadow-md p-4 sm:p-6 border-t-4 transition-colors duration-200";

  const handleShare = () => {
    const params = new URLSearchParams();
    
    Object.entries(inputs).forEach(([key, value]) => {
      if (value !== 0 && value !== '') {
        params.append(`i_${key}`, value.toString());
      }
    });
    
    Object.entries(settings).forEach(([key, value]) => {
      if (value !== DEFAULT_SETTINGS[key]) {
        params.append(`s_${key}`, value.toString());
      }
    });
    
    const url = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <div className={`${containerClasses} border-blue-500`}>
          <RevenueSection />
        </div>
        <div className={`${containerClasses} border-green-500`}>
          <OtherCostsSection />
        </div>
      </div>
      
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        <div className={`${containerClasses} border-orange-500`}>
          <EtsyFeesSection />
        </div>
        <div className={`${containerClasses} border-indigo-500`}>
          <h3 className="text-lg sm:text-xl font-semibold mb-4 text-custom-text dark:text-custom-dark-text">Summary</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm sm:text-base">
              <span className="text-custom-text dark:text-custom-dark-text">Total Revenue</span>
              <span className="font-medium text-custom-text dark:text-custom-dark-text">{calculations.totalRevenue.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base">
              <span className="text-custom-text dark:text-custom-dark-text">Total Fees</span>
              <span className="font-medium text-custom-text dark:text-custom-dark-text">{calculations.totalFees.toFixed(2)}€</span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base">
              <span className="text-custom-text dark:text-custom-dark-text">Total Cost (without VAT)</span>
              <span className="font-medium text-custom-text dark:text-custom-dark-text">
                {calculations.baseCost.toFixed(2)}€
              </span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base">
              <span className="text-custom-text dark:text-custom-dark-text">Fee Ratio</span>
              <span className="font-medium text-custom-text dark:text-custom-dark-text">{feeRatio.toFixed(1)}%</span>
            </div>
            <div className="flex justify-between items-center text-sm sm:text-base">
              <span className="text-custom-text dark:text-custom-dark-text">VAT</span>
              <span className="font-medium text-custom-text dark:text-custom-dark-text">{calculations.tax.toFixed(2)}€</span>
            </div>
            <div className="pt-3 border-t dark:border-custom-dark-border">
              <div className="flex justify-between items-center text-sm sm:text-base">
                <span className="text-custom-text dark:text-custom-dark-text font-medium">Breakeven Price</span>
                <span className="font-medium text-custom-text dark:text-custom-dark-text">{breakeven.toFixed(2)}€</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`${containerClasses} border-purple-500`}>
        <ProfitSection />
      </div>
      
      <AdvancedSettings />

      <div className="flex justify-center">
        <button
          onClick={handleShare}
          className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 dark:bg-blue-500 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Share className="w-4 h-4" />
              Share Calculator Settings
            </>
          )}
        </button>
      </div>
    </div>
  );
};

const DEFAULT_SETTINGS = {
  listingFee: 0.19,
  transactionFeeRate: 0.065,
  paymentFeeRate: 0.04,
  paymentFeeFixed: 0.30,
  vatRate: 0.23,
  offsiteAdsRate: 0.12,
};

export default Calculator;