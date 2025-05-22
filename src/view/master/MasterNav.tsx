import NavButton from "../../components/NavButton";

export default function MasterNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Soldering" path={"/master"} />
      <NavButton
        name="Send External Order"
        path={"/master/soldering-invoice"}
      />
    </>
  );
}
