import React, { createContext, useContext, useState, useEffect } from 'react';

interface CalculatorInputs {
  item: string;
  itemPrice: number | string;
  shippingPrice: number | string;
  discount: number | string;
  itemCost: number | string;
  packingCost: number | string;
  shippingCost: number | string;
}

interface CalculatorSettings {
  listingFee: number;
  transactionFeeRate: number;
  paymentFeeRate: number;
  paymentFeeFixed: number;
  vatRate: number;
  offsiteAdsRate: number;
}

interface CalculatorCalculations {
  totalRevenue: number;
  listingFee: number;
  transactionFee: number;
  paymentFee: number;
  oaFee: number;
  totalFees: number;
  totalFeesOA: number;
  tax: number;
  baseCost: number;
  totalCost: number;
  profitEU: number;
  profitMarginEU: number;
  profitOAEU: number;
  profitMarginOAEU: number;
  profitNONEU: number;
  profitMarginNONEU: number;
  profitOANONEU: number;
  profitMarginOANONEU: number;
  breakeven: number;
}

interface CalculatorContextType {
  inputs: CalculatorInputs;
  settings: CalculatorSettings;
  calculations: CalculatorCalculations;
  setInputValue: (key: keyof CalculatorInputs, value: any) => void;
  updateSettings: (key: keyof CalculatorSettings, value: number) => void;
}

const DEFAULT_SETTINGS: CalculatorSettings = {
  listingFee: 0.19,
  transactionFeeRate: 0.065,
  paymentFeeRate: 0.04,
  paymentFeeFixed: 0.30,
  vatRate: 0.23,
  offsiteAdsRate: 0.12,
};

const DEFAULT_INPUTS: CalculatorInputs = {
  item: '',
  itemPrice: '',
  shippingPrice: '',
  discount: '',
  itemCost: '',
  packingCost: '',
  shippingCost: '',
};

const DEFAULT_CALCULATIONS: CalculatorCalculations = {
  totalRevenue: 0,
  listingFee: DEFAULT_SETTINGS.listingFee,
  transactionFee: 0,
  paymentFee: 0,
  oaFee: 0,
  totalFees: 0,
  totalFeesOA: 0,
  tax: 0,
  baseCost: 0,
  totalCost: 0,
  profitEU: 0,
  profitMarginEU: 0,
  profitOAEU: 0,
  profitMarginOAEU: 0,
  profitNONEU: 0,
  profitMarginNONEU: 0,
  profitOANONEU: 0,
  profitMarginOANONEU: 0,
  breakeven: 0,
};

const CalculatorContext = createContext<CalculatorContextType | undefined>(undefined);

interface CalculatorProviderProps {
  children: React.ReactNode;
  initialState?: {
    settings?: Partial<CalculatorSettings>;
    inputs?: Partial<CalculatorInputs>;
  };
}

const parseNumberInput = (value: string | number): number => {
  if (typeof value === 'number') return value;
  if (value === '' || value === '0.') return 0;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? 0 : parsed;
};

export const CalculatorProvider: React.FC<CalculatorProviderProps> = ({ children, initialState }) => {
  const [inputs, setInputs] = useState<CalculatorInputs>({
    ...DEFAULT_INPUTS,
    ...initialState?.inputs,
  });
  const [settings, setSettings] = useState<CalculatorSettings>({
    ...DEFAULT_SETTINGS,
    ...initialState?.settings,
  });
  const [calculations, setCalculations] = useState<CalculatorCalculations>(DEFAULT_CALCULATIONS);

  const setInputValue = (key: keyof CalculatorInputs, value: any) => {
    setInputs((prev) => ({ ...prev, [key]: value }));
  };

  const updateSettings = (key: keyof CalculatorSettings, value: number) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    const itemPrice = parseNumberInput(inputs.itemPrice);
    const shippingPrice = parseNumberInput(inputs.shippingPrice);
    const discount = parseNumberInput(inputs.discount);
    const itemCost = parseNumberInput(inputs.itemCost);
    const packingCost = parseNumberInput(inputs.packingCost);
    const shippingCost = parseNumberInput(inputs.shippingCost);

    const totalRevenue = (itemPrice - discount) + shippingPrice;
    const baseCost = itemCost + packingCost + shippingCost;
    
    const transactionFee = totalRevenue * settings.transactionFeeRate;
    const paymentFee = totalRevenue * settings.paymentFeeRate + settings.paymentFeeFixed;
    const oaFee = totalRevenue * settings.offsiteAdsRate;
    const totalFees = settings.listingFee + transactionFee + paymentFee;
    const totalFeesOA = totalFees + oaFee;

    const tax = totalRevenue * settings.vatRate;
    const totalCost = baseCost + tax;

    // Profit calculations
    const profitEU = totalRevenue - totalFees - totalCost;
    const profitMarginEU = totalRevenue ? (profitEU / totalRevenue) * 100 : 0;
    const profitOAEU = totalRevenue - totalFeesOA - totalCost;
    const profitMarginOAEU = totalRevenue ? (profitOAEU / totalRevenue) * 100 : 0;

    const profitNONEU = totalRevenue - totalFees - baseCost;
    const profitMarginNONEU = totalRevenue ? (profitNONEU / totalRevenue) * 100 : 0;
    const profitOANONEU = totalRevenue - totalFeesOA - baseCost;
    const profitMarginOANONEU = totalRevenue ? (profitOANONEU / totalRevenue) * 100 : 0;

    // Breakeven calculation
    const totalFeeRate = settings.transactionFeeRate + settings.paymentFeeRate;
    const breakeven = itemCost > 0 ? 
      (itemCost + packingCost + settings.listingFee + settings.paymentFeeFixed) / 
      (1 - totalFeeRate) : 0;

    setCalculations({
      totalRevenue,
      listingFee: settings.listingFee,
      transactionFee,
      paymentFee,
      oaFee,
      totalFees,
      totalFeesOA,
      tax,
      baseCost,
      totalCost,
      profitEU,
      profitMarginEU,
      profitOAEU,
      profitMarginOAEU,
      profitNONEU,
      profitMarginNONEU,
      profitOANONEU,
      profitMarginOANONEU,
      breakeven,
    });
  }, [inputs, settings]);

  return (
    <CalculatorContext.Provider value={{ inputs, settings, calculations, setInputValue, updateSettings }}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => {
  const context = useContext(CalculatorContext);
  if (context === undefined) {
    throw new Error('useCalculator must be used within a CalculatorProvider');
  }
  return context;
};

export default CalculatorContext;