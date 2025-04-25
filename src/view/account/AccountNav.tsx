import NavButton from "../../components/NavButton";

export default function AccountNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Account" path={"/account"} />
      <NavButton name="Add Expenses" path={"/account/expence/"} />
      <NavButton name="Bank Accounts" path={"/account/bank_accounts/"} />
    </>
  );
}
