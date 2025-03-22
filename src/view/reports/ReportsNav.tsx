import NavButton from "../../components/NavButton";

export default function ReportsNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Invoices" path={"/reports"} />
      <NavButton name="Frames" path={"reports/frames/"} />
      <NavButton name="Lense" path={"reports/lense/"} />
      
    </>
  );
}
