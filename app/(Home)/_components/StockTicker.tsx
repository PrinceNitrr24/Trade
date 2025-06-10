import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StockTickerProps {
  stock: {
    name: string;
    value: number;
    change: number;
    trend: string;
  };
}

function StockTicker({ stock }: StockTickerProps) {
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="w-3 h-3 text-green-600" />;
      case "down":
        return <TrendingDown className="w-3 h-3 text-red-600" />;
      default:
        return <Minus className="w-3 h-3 text-gray-400" />;
    }
  };

  return (
    <div className="text-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
      <div className="text-xs font-medium text-gray-600">{stock.name}</div>
      <div className="flex items-center space-x-1">
        <span className="text-sm font-bold text-gray-900">
          {stock.value === 0
            ? "0.00"
            : stock.value.toLocaleString("en-IN", {
                minimumFractionDigits: 2,
              })}
        </span>
        <div className="flex items-center space-x-1">
          {getTrendIcon(stock.trend)}
          <span
            className={`text-xs ${
              stock.change >= 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {stock.change >= 0 ? "+" : ""}
            {stock.change.toFixed(2)}%
          </span>
        </div>
      </div>
    </div>
  );
}

export default StockTicker;
