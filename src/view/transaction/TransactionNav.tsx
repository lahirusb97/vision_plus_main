import NavButton from "../../components/NavButton";


export default function TransactionNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Factory Invoice" path={"/transaction/FactoryInvoice"} />
      <NavButton name="Normal Invoice" path={"/transaction/NormalInvoice"} />
      <NavButton name="Edit Invoice" path={"/transaction/EditInvoice"} />
      <NavButton name="Delete Invoice" path={"/transaction/DeleteInvoice"} />
      

    </>
  );
}