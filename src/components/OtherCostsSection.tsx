import React from 'react';
import { useCalculator } from '../context/CalculatorContext';
import { InputField } from './InputField';
import { Info } from 'lucide-react';
import { Tooltip } from './Tooltip';

export const OtherCostsSection: React.FC = () => {
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
      <h2 className="text-xl font-semibold mb-4 text-custom-text dark:text-custom-dark-text">Other Costs</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <LabelWithTooltip 
            label="Item Cost" 
            tooltip="Your cost to purchase or make the item"
          />
          <div className="flex-1 max-w-[200px]">
            <InputField
              label=""
              type="number"
              value={inputs.itemCost}
              onChange={(value) => setInputValue('itemCost', value)}
              symbol="€"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <LabelWithTooltip 
            label="Packing Cost" 
            tooltip="Cost of packaging materials"
          />
          <div className="flex-1 max-w-[200px]">
            <InputField
              label=""
              type="number"
              value={inputs.packingCost}
              onChange={(value) => setInputValue('packingCost', value)}
              symbol="€"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <LabelWithTooltip 
            label="Shipping Cost" 
            tooltip="Your actual cost to ship the item"
          />
          <div className="flex-1 max-w-[200px]">
            <InputField
              label=""
              type="number"
              value={inputs.shippingCost}
              onChange={(value) => setInputValue('shippingCost', value)}
              symbol="€"
            />
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-custom-text dark:text-custom-dark-text">Tax</span>
          <span className="font-medium text-custom-text dark:text-custom-dark-text">{calculations.tax.toFixed(2)}€</span>
        </div>
        <div className="pt-4 border-t dark:border-custom-dark-border">
          <div className="flex justify-between items-center font-semibold text-custom-text dark:text-custom-dark-text">
            <span>Total Cost</span>
            <span>{calculations.baseCost.toFixed(2)}€</span>
          </div>
        </div>
      </div>
    </div>
  );
};