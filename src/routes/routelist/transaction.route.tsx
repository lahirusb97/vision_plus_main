import FactoryInvoice from "../../view/transaction/factoryInvoice";
import { RouteObject } from "react-router";
import NormalInvoice from "../../view/transaction/normalInvoice";
import EditInvoice from "../../view/transaction/EditInvoice";
import DeleteInvoice from "../../view/transaction/DeleteInvoice";

import { lazy, Suspense } from "react";
const TransactionEdit = lazy(() => import("../../view/transaction/TransactionEdit"));

export const transactionRoutes: RouteObject[] = [
  {
    path: "",
    element: <FactoryInvoice />,
  },
  {
    path: "",
    element: <NormalInvoice />,
  },
  {
    path: "",
    element: <EditInvoice />,
  },
  {
    path: "",
    element: <DeleteInvoice />,
  },
  {
    path: "transaction/",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <TransactionEdit />
      </Suspense>
    ),
  },
];
