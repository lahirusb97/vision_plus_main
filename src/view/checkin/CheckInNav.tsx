import NavButton from "../../components/NavButton";

export default function CheckInNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Job Progress" path={"/checkin"} />
      <NavButton name="Send External Order" path={"/checkin/send_order"} />
    </>
  );
}
