import NavButton from "../../components/NavButton";

export default function SearchNav() {
  return (
    <>
      <NavButton name="Factory Invoice Search" path={"/search"} />
      <NavButton name="Invoice Number Search" path={"/search/print_out"} />
    </>
  );
}
