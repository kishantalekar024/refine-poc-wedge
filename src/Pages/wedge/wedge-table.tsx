import { useDataGrid } from "@refinedev/mui";
import { Box } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { data } from "./data";

const OnBoardingTable = () => {
  const { dataGridProps } = useDataGrid({
    resource: "onboarding",
    pagination: {
      pageSize: 10,
    },
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
    { field: "manualNotes", headerName: "Manual Notes", width: 180 },
    { field: "isManualOverridden", headerName: "Is OverRidden", width: 180 },
    { field: "overriddenBy", headerName: "overriddenBy", width: 180 },
    { field: "idvs", headerName: "idvs", width: 180 },
    { field: "failureReason", headerName: "Failure Reason", width: 180 },
  ];
  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid {...dataGridProps} columns={columns} />
    </Box>
  );
};

export default OnBoardingTable;
