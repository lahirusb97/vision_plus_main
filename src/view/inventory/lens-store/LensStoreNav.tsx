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
      {/* <NavButton
        name="Lens Variation Create"
        path="/inventory-lens/lens-variation-create"
      /> */}

      {/* <NavButton name="Frame Create" path="/inventory-frame/frame-create" />
            <NavButton name="Frame Store" path="/inventory-frame/frame-store" />
            <NavButton
              name="Frame Stock Updates"
              path="/inventory-frame/frame-stock-update"
            />
            <NavButton name="Frame Report" path="inventory-frame/frame-report" />
            <NavButton
              name="Variation Create"
              path="/inventory-frame/add_variation"
            /> */}
    </>
  );
}
