import NavButton from "../../components/NavButton";

export default function ReportsNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Invoice Report" path={"/reports"} />
      <NavButton name="Frames Report" path={"/reports/frames_report"} />
      <NavButton name="Lens Report" path={"/reports/lens_report"} />
      {/* add button & conect paths from  reports.route.tsfile as you need for the UI  */}
    </>
  );
}
