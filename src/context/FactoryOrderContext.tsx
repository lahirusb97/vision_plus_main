import { createContext, ReactNode, useContext, useState } from "react";
import { useParams } from "react-router";
import useGetSingleRefractionNumber from "../hooks/useGetSingleRefractionNumber";
import useGetRefractionDetails from "../hooks/useGetRefractionDetails";
import { RefractionDetailModel } from "../model/RefractionDetailModel";
import { RefractionNumberFormModel } from "../validations/schemaRefractionNumber";
import { RefractionNumberModel } from "../model/RefractionModel";
interface FactoryOrderContext {
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
  const { id } = useParams();

  const { singlerefractionNumber, singlerefractionNumberLoading } =
    useGetSingleRefractionNumber(id);
  const { refractionDetail, refractionDetailLoading } =
    useGetRefractionDetails(id);

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
