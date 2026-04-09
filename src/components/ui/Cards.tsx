"use client";

interface StatCardProps {
  label: string;
  value: string | number;
  change?: number;
  color?: "green" | "red" | "blue" | "purple" | "yellow" | "cyan";
  large?: boolean;
}

export function StatCard({ label, value, change, color = "green", large }: StatCardProps) {
  const colorClasses = {
    green: "text-accent-green",
    red: "text-accent-red",
    blue: "text-accent-blue",
    purple: "text-accent-purple",
    yellow: "text-accent-yellow",
    cyan: "text-accent-cyan",
  };

  return (
    <div className="bg-surface-elevated border border-border rounded-lg p-4 hover:border-borderHover transition-colors">
      <div className="text-text-muted text-xs uppercase tracking-wider mb-1">{label}</div>
      <div className={`font-mono ${large ? "text-2xl" : "text-lg"} font-bold ${colorClasses[color]}`}>
        {typeof value === "number" ? value.toLocaleString() : value}
      </div>
      {change !== undefined && (
        <div className={`text-xs mt-1 ${change >= 0 ? "text-accent-green" : "text-accent-red"}`}>
          {change >= 0 ? "+" : ""}{change.toFixed(2)}%
        </div>
      )}
    </div>
  );
}

interface PositionCardProps {
  symbol: string;
  quantity: number;
  entry_price: number;
  current_price: number;
  pnl: number;
  pnl_pct: number;
  confidence: number;
}

export function PositionCard({ symbol, quantity, entry_price, current_price, pnl, pnl_pct, confidence }: PositionCardProps) {
  const isProfit = pnl >= 0;

  return (
    <div className="bg-surface-elevated border border-border rounded-lg p-4 hover:border-borderHover transition-colors">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-accent-purple/20 flex items-center justify-center text-accent-purple font-mono text-sm font-bold">
            {symbol.slice(0, 2)}
          </div>
          <div>
            <div className="font-mono font-bold text-text-primary">{symbol}</div>
            <div className="text-xs text-text-muted">${current_price.toFixed(4)}</div>
          </div>
        </div>
        <div className="text-right">
          <div className={`font-mono font-bold ${isProfit ? "text-accent-green" : "text-accent-red"}`}>
            {isProfit ? "+" : ""}${pnl.toFixed(2)}
          </div>
          <div className={`text-xs ${isProfit ? "text-accent-green" : "text-accent-red"}`}>
            {isProfit ? "+" : ""}{pnl_pct.toFixed(2)}%
          </div>
        </div>
      </div>
      <div className="flex justify-between text-xs text-text-muted">
        <span>Qty: {quantity.toFixed(4)}</span>
        <span>Entry: ${entry_price.toFixed(4)}</span>
        <span>Conf: {(confidence * 100).toFixed(0)}%</span>
      </div>
    </div>
  );
}

interface StatusIndicatorProps {
  label: string;
  status: "green" | "yellow" | "red";
  active?: boolean;
}

export function StatusIndicator({ label, status, active = true }: StatusIndicatorProps) {
  const statusColors = {
    green: "bg-accent-green",
    yellow: "bg-accent-yellow",
    red: "bg-accent-red",
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-2 h-2 rounded-full ${statusColors[status]} ${active ? "animate-pulse" : "opacity-50"}`} />
      <span className="text-xs text-text-muted">{label}</span>
    </div>
  );
}
