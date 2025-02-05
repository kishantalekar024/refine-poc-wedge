import React from "react";
import { useOne, BaseKey, useGo, useShow } from "@refinedev/core";

export const User: React.FC = () => {
  const { query } = useShow<IUser>();

  const { isLoading, data, error, isError } = query;
  const go = useGo();

  if (isError) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const user = data?.data;

  return (
    <div>
      <h4>{user?.name}</h4>
      <p>{user?.id}</p>
      <p>{user?.createdAt} </p>

      <p>avatar: {user?.avatar}</p>

      <button
        onClick={() => {
          go({
            to: {
              resource: "users",
              action: "edit",
              id: user?.id,
            },
          });
        }}
      >
        edit
      </button>
    </div>
  );
};

export interface IUser {
  id: BaseKey;
  name: string;
  avatar: string;
  idvEntried: [];
  createdAt: string;
}
