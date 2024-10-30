import React from 'react';
import { useCalculator } from '../context/CalculatorContext';

export const EtsyFeesSection: React.FC = () => {
  const { calculations } = useCalculator();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-custom-text dark:text-custom-dark-text">Etsy Fees</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-custom-text dark:text-custom-dark-text">Listing Fee</span>
          <span className="font-medium text-custom-text dark:text-custom-dark-text">{calculations.listingFee.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-custom-text dark:text-custom-dark-text">Transaction Fee</span>
          <span className="font-medium text-custom-text dark:text-custom-dark-text">{calculations.transactionFee.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-custom-text dark:text-custom-dark-text">Payment Fee</span>
          <span className="font-medium text-custom-text dark:text-custom-dark-text">{calculations.paymentFee.toFixed(2)}€</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-custom-text dark:text-custom-dark-text">Offsite Ads Fee</span>
          <span className="font-medium text-custom-text dark:text-custom-dark-text">{calculations.oaFee.toFixed(2)}€</span>
        </div>
        <div className="pt-4 border-t dark:border-custom-dark-border">
          <div className="flex justify-between items-center font-semibold text-custom-text dark:text-custom-dark-text">
            <span>Total Fees</span>
            <span>{calculations.totalFees.toFixed(2)}€</span>
          </div>
          <div className="flex justify-between items-center text-custom-text dark:text-custom-dark-text mt-2">
            <span>Total Fees from Offsite Ads</span>
            <span>{calculations.totalFeesOA.toFixed(2)}€</span>
          </div>
        </div>
      </div>
    </div>
  );
};