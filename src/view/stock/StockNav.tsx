import NavButton from "../../components/NavButton";

export default function StockNav() {
  return (
    <>
      <NavButton name="Frame Store" path="/stock/frame_store" />
      <NavButton name="Lens Store" path="/stock/lens_store" />
      <NavButton name="External Lens Store " path="/stock/external_lense" />

      <NavButton name="Other item Store" path="/stock/other_item_stock" />
      <NavButton
        bgColor="#208C27"
        name="Frame Create"
        path="/stock/add_frames"
      />
      <NavButton
        bgColor="#208C27"
        name="Lense Create"
        path="/stock/add_lense"
      />
      <NavButton
        bgColor="#208C27"
        name="External Lens Create "
        path="/stock/external_lense/create"
      />
      <NavButton
        bgColor="#208C27"
        name="Other item Create"
        path="/stock/add_other_item"
      />
      <NavButton
        bgColor="#208C27"
        name="Variations Create "
        path="/stock/add_variation"
      />
    </>
  );
}
