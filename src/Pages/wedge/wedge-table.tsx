import { useDataGrid } from "@refinedev/mui";
import { Box } from "@mui/material";
import { GridColDef, DataGrid } from "@mui/x-data-grid";
import { data } from "./data";

const sampleData = [
  {
    id: "1",
    email: "john.doe@example.com",
    ird_number: "INRD8374X",
    status: "MANUAL_IDV_REQUESTED",
    intended_transaction_count: 25,
    intended_transaction_amount: 3250.75,
    phone_number: "+1-312-555-0178",
    failureReason: "DOCUMENT_EXPIRED",
  },
  {
    id: "1",

    email: "sophia.wilson@outlook.com",
    ird_number: "INRD3927K",
    status: "COMPLETED",
    intended_transaction_count: 48,
    intended_transaction_amount: 9284.6,
    phone_number: "+44-7812-555-032",
    failureReason: null,
  },
  {
    id: "1",

    email: "liam.patel@gmail.com",
    ird_number: "INRD5219Q",
    status: "FAILED",
    intended_transaction_count: 10,
    intended_transaction_amount: 1475.3,
    phone_number: "+61-400-555-778",
    failureReason: "FACE_MISMATCH",
  },
];

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
