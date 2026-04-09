"use client";

import { useDashboardState } from "@/hooks/useDashboardState";
import { PositionCard } from "@/components/ui/Cards";

export default function CryptoPage() {
  const { data, loading } = useDashboardState(5000);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="text-text-muted animate-pulse">Loading crypto data...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Crypto Trading</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Positions */}
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-4">Active Positions</h2>
          <div className="space-y-3">
            {data?.positions.map((pos) => (
              <PositionCard
                key={pos.symbol}
                symbol={pos.symbol}
                quantity={pos.quantity}
                entry_price={pos.entry_price}
                current_price={pos.current_price}
                pnl={pos.pnl}
                pnl_pct={pos.pnl_pct * 100}
                confidence={pos.confidence}
              />
            ))}
          </div>
        </div>

        {/* Exit Stats */}
        <div>
          <h2 className="text-lg font-bold text-text-primary mb-4">Exit Reasons</h2>
          <div className="bg-surface-elevated border border-border rounded-lg p-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-text-muted text-xs">Stop Loss</div>
                <div className="text-accent-red font-mono font-bold">{data?.exits.stop_loss ?? 0}</div>
              </div>
              <div>
                <div className="text-text-muted text-xs">Take Profit</div>
                <div className="text-accent-green font-mono font-bold">{data?.exits.take_profit ?? 0}</div>
              </div>
              <div>
                <div className="text-text-muted text-xs">Trailing</div>
                <div className="text-accent-blue font-mono font-bold">{data?.exits.trailing ?? 0}</div>
              </div>
              <div>
                <div className="text-text-muted text-xs">Time Exit</div>
                <div className="text-accent-yellow font-mono font-bold">{data?.exits.time ?? 0}</div>
              </div>
              <div>
                <div className="text-text-muted text-xs">Rotation</div>
                <div className="text-accent-purple font-mono font-bold">{data?.exits.rotation ?? 0}</div>
              </div>
              <div>
                <div className="text-text-muted text-xs">Momentum</div>
                <div className="text-accent-cyan font-mono font-bold">{data?.exits.momentum ?? 0}</div>
              </div>
            </div>
          </div>

          {/* Performance */}
          <h2 className="text-lg font-bold text-text-primary mb-4 mt-6">Performance</h2>
          <div className="bg-surface-elevated border border-border rounded-lg p-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-text-muted">Wins</span>
                <span className="text-accent-green font-mono font-bold">{data?.wins ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Losses</span>
                <span className="text-accent-red font-mono font-bold">{data?.losses ?? 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Win Rate</span>
                <span className="text-accent-purple font-mono font-bold">{data?.win_rate.toFixed(1) ?? "0"}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
