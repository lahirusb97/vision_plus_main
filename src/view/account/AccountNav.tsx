import NavButton from "../../components/NavButton";

export default function AccountNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Account" path={"/account"} />
      <NavButton name="Add Expenses" path={"/account/expence/"} />
      <NavButton name="Other Income" path={"/account/other_income/"} />
      <NavButton name="Bank Deposite" path={"/account/bank_deposite/"} />
      <NavButton name="Bank Accounts" path={"/account/bank_accounts/"} />
      <NavButton name="Safe Locker" path={"/account/safe/"} />
      <NavButton
        name="Safe Locker Expence"
        path={"/account/safe/safe_expence/"}
      />
    </>
  );
}
