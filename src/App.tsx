import React from "react";
import { User } from "./Pages/users/user-show";
import { Authenticated, Refine } from "@refinedev/core";
import { dataProvider } from "./Providers/data-provider";
import { UserList } from "./Pages/users/user-list";
import { Routes, Route, BrowserRouter, Outlet } from "react-router";
import routerProvider, {
  CatchAllNavigate,
  NavigateToResource,
} from "@refinedev/react-router";
import UserEdit from "./Pages/users/user-edit";
import { authProvider } from "./authProvider";
import { ThemedLayoutV2 } from "@refinedev/mui";
import { Login } from "./Pages/login";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import OnBoardingTable from "./Pages/wedge/wedge-table";

export default function App() {
  return (
    <BrowserRouter>
      <DevtoolsProvider>
        <Refine
          authProvider={authProvider}
          routerProvider={routerProvider}
          dataProvider={{
            default: dataProvider(
              "https://670cc7d77e5a228ec1d15f7e.mockapi.io"
            ),
            onboarding: dataProvider("z"),
          }}
          resources={[
            {
              name: "users",
              list: "/users", // http://localhost:3000users
              show: "/users/:id", // http://localhost:3000users/1
              create: "/users/new", // http://localhost:3000users/new
              edit: "/users/:id/edit", // http://localhost:3000users/1/edit
              clone: "/users/:id/clone", // http://localhost:3000/my-products/1/clone
            },
            {
              name: "onboarding",
              list: "/onboarding",
              meta: {
                dataProviderName: "",
              },
            },
          ]}
        >
          <DevtoolsPanel />
          <Routes>
            <Route
              element={
                <Authenticated
                  key="authenticated-inner"
                  fallback={<CatchAllNavigate to="/login" />}
                >
                  <ThemedLayoutV2>
                    <Outlet />
                  </ThemedLayoutV2>
                </Authenticated>
              }
            >
              <Route index element={<NavigateToResource resource="users" />} />
              <Route path="/users" element={<UserList />} />
              <Route path="/users/:id" element={<User />} />
              <Route path="/users/:id/edit" element={<UserEdit />} />
              <Route path="/onboarding" element={<OnBoardingTable />}></Route>
            </Route>

            <Route
              element={
                <Authenticated key="authenticated-outer" fallback={<Outlet />}>
                  <NavigateToResource />
                </Authenticated>
              }
            >
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </Refine>
      </DevtoolsProvider>
    </BrowserRouter>
  );
}
