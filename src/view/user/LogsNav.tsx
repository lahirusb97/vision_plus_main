import NavButton from "../../components/NavButton";

export default function UserNav() {
  return (
    <>
      {/* Pass unique onClick handlers */}
      <NavButton name="Frame Store" path={"/logs"} />
      <NavButton name="Lens Store" path={"/logs/lens"} />
    </>
  );
}
