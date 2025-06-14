export interface TodayBanking {
  bank_name: string;
  account_number: string;
  amount: number;
  is_confirmed: boolean;
}

export interface FinanceSummary {
  branch: number;
  date: string; // ISO Date format ("YYYY-MM-DD")
  before_balance: number;
  today_order_payments: number;
  today_channel_payments: number;
  today_other_income: number;
  today_expenses: number;
  today_banking: TodayBanking[];
  today_balance: number;
  cash_in_hand: number;
  available_for_deposit: number;
}
