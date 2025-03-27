import OrderEditFrom from "../order_edit/OrderEditFrom";
import { FactoryOrderUpdateProvider } from "../../../context/FactoryOrderUpdateContext";

export default function FactoryOrderUpdate() {
  return (
    <FactoryOrderUpdateProvider>
      <OrderEditFrom />
    </FactoryOrderUpdateProvider>
  );
}
