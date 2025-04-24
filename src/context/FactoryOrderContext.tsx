import { createContext, ReactNode, useContext } from "react";
import { useParams } from "react-router";
import useGetSingleRefractionNumber from "../hooks/useGetSingleRefractionNumber";
import useGetRefractionDetails from "../hooks/useGetRefractionDetails";
import { RefractionDetailModel } from "../model/RefractionDetailModel";
import { RefractionNumberModel } from "../model/RefractionModel";

interface FactoryOrderContext {
  //  refraction data
  refractionDetail: RefractionDetailModel | null;
  singlerefractionNumber: RefractionNumberModel | null;
  refractionDetailLoading: boolean;
  singlerefractionNumberLoading: boolean;
}
interface FactoryOrderProviderProps {
  children: ReactNode;
}
const FactoryOrderContext = createContext<FactoryOrderContext>({
  refractionDetail: null,
  singlerefractionNumber: null,
  refractionDetailLoading: false,
  singlerefractionNumberLoading: false,
});

export function FactoryOrderProvider({ children }: FactoryOrderProviderProps) {
  const { refraction_id } = useParams();

  const { singlerefractionNumber, singlerefractionNumberLoading } =
    useGetSingleRefractionNumber(refraction_id);
  const { refractionDetail, refractionDetailLoading } =
    useGetRefractionDetails(refraction_id);

  return (
    <FactoryOrderContext.Provider
      value={{
        refractionDetail,
        refractionDetailLoading,
        singlerefractionNumber,
        singlerefractionNumberLoading,
      }}
    >
      {children}
    </FactoryOrderContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useFactoryOrderContext() {
  const context = useContext(FactoryOrderContext);
  if (!context) {
    throw new Error(
      "useFactoryOrderContext must be used within a FactoryOrderProvider"
    );
  }
  return context;
}
