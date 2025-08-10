import NavButton from "../../../components/NavButton";

export default function HearingNav() {
  return (
    <>
      <NavButton name="Hearing Order" path="/hearing" />
      <NavButton name="Hearing Order Edit" path="/hearing/order" />
      <NavButton name="Hearing Invoice" path="/hearing/invoice" />
      <NavButton name="Service Reminders" path="/hearing/reminder" />
      <NavButton name="Hearing Create" path="/hearing/create" />
      <NavButton name="Hearing Store" path="/hearing/hearing_item_stock/" />
    </>
  );
}
