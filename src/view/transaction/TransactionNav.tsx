import NavButton from "../../components/NavButton";

export default function TransactionNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Factory Order" path={"/transaction/factory_order"} />
      <NavButton name="Normal Order" path={"/transaction/normal_order"} />
      <NavButton name="Order Edit" path={"/transaction/order_edit"} />
      <NavButton
        name="Factory Order RePayment"
        path={"/transaction/repayment"}
      />
      <NavButton name="Invoice Search" path={"/transaction/invoice/search"} />
    </>
  );
}
