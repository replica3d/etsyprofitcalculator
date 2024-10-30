import React from 'react';

interface ProfitGraphProps {
  totalProfit: number;
  totalCosts: number;
}

export const ProfitGraph: React.FC<ProfitGraphProps> = ({ totalProfit, totalCosts }) => {
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const profitOffset = circumference * (1 - Math.abs(totalProfit) / 100);
  const costsOffset = circumference * (1 - totalCosts / 100);

  return (
    <div className="relative flex items-center justify-center">
      <svg className="transform -rotate-90 w-32 h-32">
        {/* Background circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke="#e5e7eb"
          strokeWidth="8"
          fill="none"
        />
        
        {/* Profit circle */}
        <circle
          cx="64"
          cy="64"
          r={radius}
          stroke={totalProfit >= 0 ? '#22c55e' : '#ef4444'}
          strokeWidth="8"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={profitOffset}
          className="transition-all duration-500 ease-in-out"
        />
      </svg>
      
      {/* Percentage labels */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <div className="space-y-1">
          <p className={`text-lg font-bold ${totalProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(totalProfit).toFixed(1)}%
          </p>
          <p className="text-xs text-custom-text">Profit</p>
        </div>
      </div>
      
      {/* Costs label */}
      <div className="absolute -right-2 -top-2">
        <div className="bg-gray-100 rounded-full px-2 py-1">
          <p className="text-xs font-medium text-custom-text">
            {totalCosts.toFixed(1)}%
          </p>
          <p className="text-xs text-custom-text">
            Costs
          </p>
        </div>
      </div>
    </div>
  );
};