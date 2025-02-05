/// <reference no-default-lib="true"/>
import { DeleteOutlined } from "@mui/icons-material";
import { List, Table, Button } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTable, useDelete, useGo } from "@refinedev/core";
import { useDataGrid } from "@refinedev/mui";
import React from "react";
import { IUser } from "./user-show";
import console from "console";

export const UserList = () => {
  const { dataGridProps } = useDataGrid<IUser>({
    resource: "users",
    pagination: {
      mode: "server",
      current: 1,
      pageSize: 10,
    },

    syncWithLocation: true,
  });
  const {
    paginationMode,
    paginationModel,
    onPaginationModelChange,
    sortingMode,
    sortModel,
    onSortModelChange,
    filterMode,
    filterModel,
    onFilterModelChange,
    ...restDataGridProps
  } = dataGridProps;
  const go = useGo();
  const columns = React.useMemo<GridColDef<IUser>[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "string",
        width: 50,
        filterable: true,
        sortable: true,
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 400,
        flex: 1,
        filterable: true,
        sortable: true,
      },
      {
        field: "idvEntried",
        headerName: "IDV",
        minWidth: 120,
        valueGetter: (params) => {
          if (Array.isArray(params)) {
            return params.map((val) => val?.id).join(",");
          }
        },
        filterable: true,
        sortable: true,
      },
      {
        field: "actions",
        headerName: "Actions",
        minWidth: 150,
        filterable: false,
        sortable: false,
        renderCell: (params) => {
          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                go({
                  to: {
                    resource: "users",
                    action: "show",
                    id: params.row.id,
                  },
                });
              }}
            >
              View
            </Button>
          );
        },
      },
    ],
    [go]
  );
  return (
    <div>
      <DataGrid {...dataGridProps} columns={columns} />
    </div>
  );
};
