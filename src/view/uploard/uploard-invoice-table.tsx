import {
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  CircularProgress,
  Tooltip,
  Button,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CircleIcon from "@mui/icons-material/Circle";
import { dateAndTimeFormat } from "../../utils/dateAndTimeFormat";
import { progressStatus } from "../../utils/progressState";
import CustomerPagination from "../../components/CustomPagination";
import FactoryInvoiceSearch from "../../hooks/FactoryInvoiceSearch";
import ProgressStagesColors from "../../components/ProgressStagesColors";
import { customerPaymentTotal } from "../../utils/customerPaymentTotal";
import { numberWithCommas } from "../../utils/numberWithCommas";
import useGetCheckinInvoiceList from "../../hooks/useGetCheckinInvoiceList";
import StatusWithTimestamp from "../../components/common/SmallDateAndTime";
import { UploadRounded } from "@mui/icons-material";

const UploadInvoiceCards = () => {
  const {
    invoiceList,
    invoiceLimit,
    invoiceListSearch,
    invoiceListChangePageSize,
    invoiceListPageNavigation,
    invoiceListLoading,
    invoiceListTotalCount,
  } = useGetCheckinInvoiceList();

  return (
    <div style={{ padding: 20, width: "100vw" }}>
      <FactoryInvoiceSearch invoiceListSearch={invoiceListSearch} />
      <ProgressStagesColors />
      {invoiceListLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
          <CircularProgress />
        </Box>
      ) : invoiceList.length === 0 ? (
        <Typography align="center" sx={{ my: 2 }}>
          No data found
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {invoiceList.map((row) => (
            <Grid item xs={12} sm={6} md={4} key={row.id}>
              <Card>
                <CardContent>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      mb: 1,
                    }}
                  >
                    <Box>
                      <Typography variant="h6">{row.invoice_number}</Typography>
                      {row.mnt_number && (
                        <Typography variant="caption">
                          {row.mnt_number}
                        </Typography>
                      )}
                    </Box>
                    <Box>
                      <Tooltip title={row.on_hold ? "On Hold" : "Not On Hold"}>
                        <CircleIcon
                          color={row.on_hold ? "error" : "success"}
                          fontSize="small"
                        />
                      </Tooltip>
                      {row.fitting_on_collection && (
                        <Tooltip title="Fitting on Collection">
                          <CircleIcon color="primary" fontSize="small" />
                        </Tooltip>
                      )}
                    </Box>
                  </Box>
                  <Typography variant="subtitle1">{row.customer}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {dateAndTimeFormat(row.invoice_date)}
                  </Typography>
                  <Box sx={{ display: "flex", gap: 2, my: 1 }}>
                    <Box>
                      <Typography variant="caption">Total</Typography>
                      <Typography>
                        {numberWithCommas(row.total_price)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Paid</Typography>
                      <Typography>
                        {numberWithCommas(customerPaymentTotal(row.payments))}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="caption">Balance</Typography>
                      <Typography>
                        {numberWithCommas(
                          parseInt(row.total_price) -
                            customerPaymentTotal(row.payments)
                        )}
                      </Typography>
                    </Box>
                  </Box>
                  {row.progress_status ? (
                    <StatusWithTimestamp
                      label={progressStatus(
                        row.progress_status.progress_status
                      )}
                      iso={row.progress_status.changed_at}
                    />
                  ) : (
                    <Typography>—</Typography>
                  )}
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                  <IconButton
                    size="small"
                    component="a"
                    href={`/transaction/invoice/view/${row.invoice_number}/?invoice_number=${row.invoice_number}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <AssignmentIcon fontSize="small" />
                  </IconButton>
                  <Button
                    size="small"
                    component="a"
                    href={`/image-upload/${row.order}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="contained"
                  >
                    Uploard
                    <UploadRounded fontSize="small" />
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <CustomerPagination
        totalCount={invoiceListTotalCount}
        handlePageNavigation={invoiceListPageNavigation}
        changePageSize={invoiceListChangePageSize}
        page_size={invoiceLimit}
      />
    </div>
  );
};

export default UploadInvoiceCards;
