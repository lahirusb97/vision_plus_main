import NavButton from "../../components/NavButton";

export default function ReportsNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Invoice Report" path={"/reports"} />
      <NavButton name="Frames Report" path={"/reports/frames_report"} />
      <NavButton name="Lens Report" path={"/reports/lens_report"} />
      <NavButton name="Best Customer" path={"/reports/best_customer"} />
      <NavButton name="Customer Location" path={"/reports/customer_location"} />
      <NavButton name="Invoice Summary" path={"/reports/invoice_summary"} />
      <NavButton name="Doctor Claim" path={"/reports/doctor_claim"} />
      <NavButton name="Fitting Lab " path={"/reports/report-fitting-lab"} />
      {/* add button & conect paths from  reports.route.tsfile as you need for the UI  */}
    </>
  );
}
