import NavButton from "../../components/NavButton";

export default function StockNav() {
  return (
    <>
      <NavButton name="Frame Store" path="/stock/frame_store" />
      <NavButton name="Lens Store" path="/stock/lens_store" />
      <NavButton name="Other item Store" path="/stock/other_item_stock" />
      <NavButton name="Frame Create" path="/stock/add_frames" />
      <NavButton name="Lense Create" path="/stock/add_lense" />
      <NavButton name="Other item Create" path="/stock/add_other_item" />
      <NavButton name="Variations Create " path="/stock/add_variation" />
    </>
  );
}
