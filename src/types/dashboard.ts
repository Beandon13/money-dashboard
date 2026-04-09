export interface Position {
  symbol: string;
  side: string;
  quantity: number;
  entry_price: number;
  current_price: number;
  entry_time: number;
  pnl: number;
  pnl_pct: number;
  age_secs: number;
  confidence: number;
  reason: string;
}

export interface ClosedTrade {
  symbol: string;
  side: string;
  quantity: number;
  entry_price: number;
  exit_price: number;
  pnl: number;
  pnl_pct: number;
  entry_time: number;
  exit_time: number;
  reason: string;
}

export interface DashboardState {
  balance: number;
  initial: number;
  pnl: number;
  pnl_pct: number;
  total_trades: number;
  wins: number;
  losses: number;
  win_rate: number;
  panic_mode: boolean;
  exits: {
    stop_loss: number;
    take_profit: number;
    trailing: number;
    time: number;
    rotation: number;
    momentum: number;
    partial_tp: number;
  };
  positions: Position[];
  closed_trades: ClosedTrade[];
  timestamp?: number;
}
