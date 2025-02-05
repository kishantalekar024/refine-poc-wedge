import { useDataGrid } from "@refinedev/mui";
import { Box } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { data } from "./data";

const OnBoardingTable = () => {
  const { dataGridProps } = useDataGrid({
    resource: "transactions",
  });
  const columns: GridColDef[] = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "ird_number", headerName: "IRD Number", width: 150 },
    { field: "status", headerName: "Status", width: 120 },
    {
      field: "intended_transaction_count",
      headerName: "Transaction Count",
      width: 180,
    },
    {
      field: "intended_transaction_amount",
      headerName: "Transaction Amount",
      width: 180,
    },
    { field: "phone_number", headerName: "Phone Number", width: 180 },
    { field: "failureReason", headerName: "Failure Reason", width: 180 },
  ];
  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid {...dataGridProps} rows={data} columns={columns} />
    </Box>
  );
};

export default OnBoardingTable;
