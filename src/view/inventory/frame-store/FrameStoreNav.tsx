import NavButton from "../../../components/NavButton";

export default function FrameStoreNav() {
  return (
    <>
      <NavButton name="Frame Create" path="/inventory-frame/frame-create" />
      <NavButton name="Frame Store" path="/inventory-frame/frame-store" />
      <NavButton
        name="Frame Stock Updates"
        path="/inventory-frame/frame-stock-updates"
      />
      <NavButton name="Frame Report" path="/inventory-frame/frame-report" />
      <NavButton
        name="Variation Create"
        path="/inventory-frame/variation-create"
      />
    </>
  );
}
