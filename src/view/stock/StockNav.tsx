import NavButton from "../../components/NavButton";

export default function StockNav() {
  return (
    <>
      <NavButton name="Add Frame" path="stock/add_frames" />
      <NavButton name="Add Lense" path="/stock/add_lense" />
      <NavButton name="Frame Store" path="/stock/frame_store" />
      <NavButton name="Lens Store" path="/stock/lens_store" />
      <NavButton name="Add Variation " path="/stock/add_variation" />
      <NavButton name="Add Other item" path="/stock/add_other_item" />
      <NavButton name="Other item stock" path="/stock/other_item_stock" />
    </>
  );
}
