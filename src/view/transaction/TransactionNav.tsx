import NavButton from "../../components/NavButton";

export default function TransactionNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Factory Invoice" path={"/transaction/factory_invoice"} />
      <NavButton name="Normal Invoice" path={"/transaction/normal_invoice"} />
      <NavButton name="Edit Invoice" path={"/transaction/edit_invoice"} />
      <NavButton name="RePayment" path={"/transaction/repayment"} />
    </>
  );
}
