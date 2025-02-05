/// <reference no-default-lib="true"/>
import { DeleteOutlined, SearchOutlined } from "@mui/icons-material";
import { List, Table, Button, Input, Autocomplete } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useTable, useDelete, useGo } from "@refinedev/core";
import { useDataGrid } from "@refinedev/mui";
import React, { useEffect, useState } from "react";
import { IUser } from "./user-show";

export const UserList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { dataGridProps, setFilters } = useDataGrid<IUser>({
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

  // Debounce search and update filters
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        console.log(searchTerm);
        setFilters([
          {
            field: "name",
            operator: "contains",
            value: searchTerm,
          },
        ]);
      } else {
        setFilters([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm, setFilters]);
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
      <Input
        placeholder="Search for users"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 2, width: "100%", maxWidth: 300 }}
        renderSuffix={() => <SearchOutlined />}
      />
      <DataGrid {...dataGridProps} columns={columns} />
    </div>
  );
};
