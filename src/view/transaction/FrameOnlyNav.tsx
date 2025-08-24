import NavButton from "../../components/NavButton";
export default function FrameOnlyNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Frame Only Order" path={"/frame-only"} />

      <NavButton name="Frame Only Order Edit" path={"/frame-only/order_edit"} />

      <NavButton name="Frame Only RePayment" path={"/frame-only/repayment"} />
    </>
  );
}
