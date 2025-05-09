import NavButton from "../../components/NavButton";

export default function SearchNav() {
  return (
    <div>
      <NavButton name="Factory Invoice Search" path={"/search"} />
      <NavButton name="Invoice Number Search" path={"/search/print_out"} />
    </div>
  );
}
