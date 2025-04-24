import OnlinePayInput from "../../../components/inputui/OnlinePayInput";
import CardInput from "../../../components/inputui/CardInput";
import CashInput from "../../../components/inputui/CashInput";

export default function PaymentMethodsLayout() {
  return (
    <>
      <CashInput />
      <CardInput />
      <OnlinePayInput />
    </>
  );
}
