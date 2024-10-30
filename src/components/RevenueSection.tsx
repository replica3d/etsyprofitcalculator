import React from 'react';
import { useCalculator } from '../context/CalculatorContext';
import { InputField } from './InputField';
import { Info } from 'lucide-react';
import { Tooltip } from './Tooltip';

export const RevenueSection: React.FC = () => {
  const { inputs, setInputValue, calculations } = useCalculator();

  const LabelWithTooltip = ({ label, tooltip }: { label: string; tooltip: string }) => (
    <div className="flex items-center gap-1">
      <span className="text-custom-text dark:text-custom-dark-text">{label}</span>
      <Tooltip text={tooltip}>
        <Info className="w-4 h-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400 cursor-help" />
      </Tooltip>
    </div>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-custom-text dark:text-custom-dark-text">Revenue</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <LabelWithTooltip 
            label="Item Name" 
            tooltip="Enter the name of your product"
          />
          <div className="flex-1 max-w-[200px]">
            <InputField
              label=""
              type="text"
              value={inputs.item}
              onChange={(value) => setInputValue('item', value)}
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <LabelWithTooltip 
            label="Item Price" 
            tooltip="The selling price of your item (excluding shipping)"
          />
          <div className="flex-1 max-w-[200px]">
            <InputField
              label=""
              type="number"
              value={inputs.itemPrice}
              onChange={(value) => setInputValue('itemPrice', value)}
              symbol="€"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <LabelWithTooltip 
            label="Shipping Price" 
            tooltip="The shipping cost charged to the customer"
          />
          <div className="flex-1 max-w-[200px]">
            <InputField
              label=""
              type="number"
              value={inputs.shippingPrice}
              onChange={(value) => setInputValue('shippingPrice', value)}
              symbol="€"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <LabelWithTooltip 
            label="Discount" 
            tooltip="Any discount applied to the item price"
          />
          <div className="flex-1 max-w-[200px]">
            <InputField
              label=""
              type="number"
              value={inputs.discount}
              onChange={(value) => setInputValue('discount', value)}
              symbol="€"
            />
          </div>
        </div>
        <div className="pt-4 border-t dark:border-custom-dark-border">
          <div className="flex justify-between items-center font-semibold text-custom-text dark:text-custom-dark-text">
            <span>Total Revenue</span>
            <span>{calculations.totalRevenue.toFixed(2)}€</span>
          </div>
        </div>
      </div>
    </div>
  );
};