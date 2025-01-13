import NavButton from "../../components/NavButton";

export default function ChannelNav() {
  return (
    <>
      <NavButton name="Channeling" path="/channel" />
      {/* <NavButton name="Channel_Invoice" path="/channel/channel_invoice" /> */}
      <NavButton name="Channel Details" path="/channel/channel_details" />
      <NavButton name="Doctor" path="/channel/doctor" />
    </>
  );
}
