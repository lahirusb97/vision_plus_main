import NavButton from "../../components/NavButton";

export default function CheckInNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Status Number" path={"/checkin"} />
      <NavButton name="Transfer" path={"/checkin/transfer"} />
      <NavButton name="Send Order" path={"/checkin/send_order"} />
    </>
  );
}
