import NavButton from "../../components/NavButton";

export default function UserNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Frame Store" path={"/logs"} />
      <NavButton name="Hearing Store" path={"/logs/hearing"} />
      <NavButton name="Lens Store" path={"/logs/lens"} />
      {/* //channel deativate refind 
      //  */}
      <NavButton name="Channel Logs" path={"/logs/channel"} />
      <NavButton name="Factory Order Logs" path={"/logs/factory-order"} />
      <NavButton name="Order Audit" path={"/logs/order-audit"} />
    </>
  );
}
