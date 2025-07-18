import { useEffect } from "react";
import useGetNormalInvoiceReports from "../../../hooks/report/invoice/useFrameReports";
import { useOutletContext } from "react-router";
import { InvoiceReportContext } from "../layout/InvoiceReportLayout";

export default function NormalInvoiceReport() {
  const { end_date, start_date } = useOutletContext<InvoiceReportContext>();

  const {
    normalInvoiceReportData,
    normalInvoiceReportLoading,
    normalInvoiceReportListRefres,
    normalInvoiceReportError,
    setNormalInvoiceReportParamsData,
  } = useGetNormalInvoiceReports();

  useEffect(() => {
    setNormalInvoiceReportParamsData({
      start_date: start_date?.format("YYYY-MM-DD") || null,
      end_date: end_date?.format("YYYY-MM-DD") || null,
    });
  }, [start_date, end_date]);

  return <div>NormalInvoiceReport</div>;
}
