export interface SafeTransaction {
  id: number;
  branch: number;
  branch_name: string;
  transaction_type: "income" | "expense";
  transaction_type_display: "Expense" | "Income";
  amount: number;
  reason: string;
  reference_id: string;
  date: string;
  created_at: string;
}

export interface SafeTransactionSerializer {
  transactions: SafeTransaction[];
  summary: {
    total_income: number;
    total_expense: number;
    total_deposit: number;
    net_amount: number;
    transaction_count: number;
  };
  filters: {
    start_date: string | null;
    end_date: string | null;
    branch_id: number | null;
  };
}
