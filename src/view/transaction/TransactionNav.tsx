import NavButton from "../../components/NavButton";

export default function TransactionNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Factory Order" path={"/transaction/factory_order"} />
      <NavButton
        name="Frame Only Order"
        path={"/transaction/frame_only_order"}
      />
      <NavButton name="Normal Order" path={"/transaction/normal_order"} />
      <NavButton name="Factory Order Edit" path={"/transaction/order_edit"} />
      <NavButton
        name="Normal Order Edit"
        path={"/transaction/normal_order/search"}
      />
      <NavButton
        name="Factory Order RePayment"
        path={"/transaction/repayment"}
      />
      <NavButton name="Invoice Search" path={"/transaction/invoice/search"} />

      <NavButton name="Bus Title" path={"/transaction/bus"} />
    </>
  );
}
