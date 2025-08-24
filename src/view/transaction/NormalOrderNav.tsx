import NavButton from "../../components/NavButton";

export default function NormalOrderNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Normal Order" path={"/normal-order"} />
      <NavButton name="Normal Order Edit" path={"/normal-order/order_edit"} />
      <NavButton name="Normal Order Edit" path={"/normal-order/search"} />
      {/* <NavButton
        name="Normal Order RePayment"
        path={"/normal-order/repayment"}
      /> */}
    </>
  );
}
