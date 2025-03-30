import NavButton from "../../components/NavButton";

export default function AccountNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Account" path={"/account"} />
      <NavButton name="Expence" path={"account/expence/"} />
      <NavButton name="Add Catagory" path={"account/add_catagory/"} />
    </>
  );
}
