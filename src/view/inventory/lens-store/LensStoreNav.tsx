import NavButton from "../../../components/NavButton";

export default function LensStoreNav() {
  return (
    <>
      <NavButton name="Lens Create" path="/inventory-lens/lens-create" />
      <NavButton name="Lens Store" path="/inventory-lens/lens-store" />
      <NavButton
        name="Lens Stock Updates"
        path="/inventory-lens/lens-stock-updates"
      />
      <NavButton name="Lens Report" path="/inventory-lens/lens-report" />
      <NavButton
        name="Lens Variation Create"
        path="/inventory-lens/lens-variation-create"
      />
    </>
  );
}
