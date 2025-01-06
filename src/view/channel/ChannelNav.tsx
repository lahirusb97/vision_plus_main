import NavButton from "../../components/NavButton";

export default function ChannelNav() {
  return (
    <>
      <NavButton name="Doctor" path="/channel/doctor" />
      <NavButton name="Channel" path="/channel" />
      <NavButton name="Channel_Invoice" path="/channel/channel_invoice" />
    </>
  );
}
