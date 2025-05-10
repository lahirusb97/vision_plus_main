import NavButton from "../../components/NavButton";

export default function ChannelNav() {
  return (
    <>
      <NavButton name="Appointments" path="/channel" />
      {/* <NavButton name="Channel_Invoice" path="/channel/channel_invoice" /> */}
      <NavButton name="Channel Details" path="/channel/channel_details" />
      <NavButton name="Doctor" path="/channel/doctor" />
      <NavButton name="Doctor Shedules" path="/channel/doctor_shedule" />
      <NavButton
        name="Doctor Claim Channel"
        path="/channel/doctor_claim_channel"
      />
    </>
  );
}
