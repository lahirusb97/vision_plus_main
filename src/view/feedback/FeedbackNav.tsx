import NavButton from "../../components/NavButton";

export default function FeedbackNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Feedback" path={"/order-feedback"} />
    </>
  );
}
