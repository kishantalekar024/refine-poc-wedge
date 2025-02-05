import {
  CrudFilters,
  CrudOperators,
  CrudSorting,
  DataProvider,
  HttpError,
} from "@refinedev/core";
import {
  generateFilter,
  generateSort,
  mapOperator,
} from "@refinedev/simple-rest";
import { stringify } from "query-string";

export const dataProvider = (apiUrl: string): DataProvider => ({
  getOne: async ({ resource, id }) => {
    const response = await fetch(`${apiUrl}/${resource}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const error: HttpError = {
        message: "Error while fetching data",
        statusCode: response.status,
      };
      return Promise.reject(error);
    }

    const data = await response.json();
    return { data };
  },

  update: async ({ resource, id, variables }) => {
    const response = await fetch(`${apiUrl}/${resource}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    });
    if (!response.ok) {
      const error: HttpError = {
        message: "Error while fetching data",
        statusCode: response.status,
      };
      return Promise.reject(error);
    }

    const data = await response.json();
    return { data };
  },

  getList: async ({ resource, filters, sorters, pagination, meta }) => {
    const url = `${apiUrl}/${resource}`;
    const { current = 1, pageSize = 10, mode = "server" } = pagination ?? {};
    console.log("filters", filters);
    const queryFilters = generateFilter(filters);
    queryFilters["search"] = queryFilters["name_like"];
    delete queryFilters["name_like"];

    const query: { [key: string]: any } = {};

    if (mode === "server") {
      query.page = current; // Corrected pagination
      query.limit = pageSize; // Corrected pagination
    }

    const generatedSort = generateSort(sorters);
    if (generatedSort) {
      const { _sort, _order } = generatedSort;
      query.sortBy = _sort.join(","); // Corrected sorting
      query.order = _order.join(","); // Corrected sorting
    }

    const combinedQuery = { ...query, ...queryFilters };
    const urlWithQuery = Object.keys(combinedQuery).length
      ? `${url}?${stringify(combinedQuery)}`
      : url;
    const response = await fetch(`${urlWithQuery}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error: HttpError = {
        message: "Error while fetching data",
        statusCode: response.status,
      };
      return Promise.reject(error);
    }

    const data = await response.json();
    return {
      data,
      total: 100,
    };
  },

  create: async ({ resource, variables }) => {
    const response = await fetch(`${apiUrl}/${resource}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(variables),
    });
    if (!response.ok) {
      const error: HttpError = {
        message: "Error while fetching data",
        statusCode: response.status,
      };
      return Promise.reject(error);
    }

    const data = await response.json();
    return { data };
  },

  deleteOne: async ({ resource, id }) => {
    const response = await fetch(`${apiUrl}/${resource}/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      const error: HttpError = {
        message: "Error while fetching data",
        statusCode: response.status,
      };
      return Promise.reject(error);
    }

    const data = await response.json();
    return { data };
  },

  getApiUrl: () => apiUrl,
});
