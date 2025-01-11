import NavButton from "../../components/NavButton";

export default function StockNav() {
  return (
    <>
      <NavButton name="Add Frames" path="stock/AddFrames" />
      <NavButton name="Add Lense" path="/stock/add_lense" />
      <NavButton name="Frame Store" path="/stock/frame_store" />
      <NavButton name="Lens Store" path="/stock/lens_store" />
      <NavButton name="Add Variation " path="/stock/add_variation" />
    </>
  );
}
