export interface BankDepositeModel {
  id: number;
  branch: number;
  bank_account: number;
  bank_name: string;
  account_number: string;
  amount: string;
  date: string;
  is_confirmed: boolean;
  note: string;
}
