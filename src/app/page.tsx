"use client";

import dynamic from "next/dynamic";
import { useDashboardState } from "@/hooks/useDashboardState";
import { StatCard, PositionCard, StatusIndicator } from "@/components/ui/Cards";

const PhaserGame = dynamic(() => import("@/components/phaser/PhaserGame").then((mod) => mod.PhaserGame), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-background" />,
});

export default function OverviewPage() {
  const { data, loading, error, lastUpdated } = useDashboardState(5000);

  if (loading) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="text-text-muted animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center h-screen">
        <div className="text-accent-red">Error: {error.message}</div>
      </div>
    );
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Phaser Background */}
      <div className="absolute inset-0 z-0">
        <PhaserGame className="opacity-50" />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-text-primary">Money Dashboard</h1>
            <p className="text-text-muted text-sm">
              {lastUpdated && `Last updated: ${lastUpdated.toLocaleTimeString()}`}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator label="Trading Bot" status={data?.panic_mode ? "red" : "green"} />
            <StatusIndicator label="API" status="green" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatCard
            label="Balance"
            value={`$${data?.balance.toFixed(2) ?? "0"}`}
            color="green"
            large
          />
          <StatCard
            label="Total PnL"
            value={`$${data?.pnl.toFixed(2) ?? "0"}`}
            change={(data?.pnl_pct ?? 0) * 100}
            color={(data?.pnl ?? 0) >= 0 ? "green" : "red"}
            large
          />
          <StatCard
            label="Total Trades"
            value={data?.total_trades ?? 0}
            color="blue"
          />
          <StatCard
            label="Win Rate"
            value={`${data?.win_rate.toFixed(1) ?? "0"}%`}
            color="purple"
          />
        </div>

        {/* Positions & Trades */}
        <div className="grid grid-cols-2 gap-6">
          {/* Open Positions */}
          <div className="bg-surface/80 backdrop-blur-sm border border-border rounded-lg p-4">
            <h2 className="text-lg font-bold text-text-primary mb-4">Open Positions</h2>
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

          {/* Recent Trades */}
          <div className="bg-surface/80 backdrop-blur-sm border border-border rounded-lg p-4">
            <h2 className="text-lg font-bold text-text-primary mb-4">Recent Trades</h2>
            <div className="space-y-2">
              {data?.closed_trades.slice(0, 8).map((trade, i) => (
                <div key={i} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-text-secondary">{trade.symbol}</span>
                    <span className="text-text-muted text-xs">{trade.reason}</span>
                  </div>
                  <span className={`font-mono ${trade.pnl >= 0 ? "text-accent-green" : "text-accent-red"}`}>
                    {trade.pnl >= 0 ? "+" : ""}${trade.pnl.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
