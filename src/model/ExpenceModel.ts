export interface ExpenceSubCategory {
  id: number;
  main_category: number;
  main_category_name: string;
  name: string;
}
export interface ExpenceCategory {
  id: number;
  name: string;
}

//REPORT

export interface ExpenseItem {
  id: number;
  created_at: string;
  main_category_name: string;
  sub_category_name: string;
  amount: string;
  note: string;
  paid_from_safe: boolean;
}

export interface ExpenseReport {
  total_expense: number;
  expenses: ExpenseItem[];
}
