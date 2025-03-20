import NavButton from "../../components/NavButton";

export default function CheckInNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Job Search" path={"/checkin"} />
      <NavButton name="Job Progress" path={"/checkin/transfer"} />
      <NavButton name="Send External Order" path={"/checkin/send_order"} />
    </>
  );
}
