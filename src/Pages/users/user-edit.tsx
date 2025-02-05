import { useForm } from "@refinedev/react-hook-form";
import React from "react";
import { Box, TextField } from "@mui/material";
import { Edit } from "@refinedev/mui";
import { IUser } from "./user-show";

export const UserEdit: React.FC = () => {
  const {
    saveButtonProps,
    refineCore: { queryResult, formLoading },
    register,
    formState: { errors },
  } = useForm<IUser>({
    refineCoreProps: {
      redirect: true, // Prevent automatic redirect after submission
      successNotification: {
        message: "Successfully updated user",
        type: "success",
      },
    },
  });

  const userData = queryResult?.data?.data;

  return (
    <Edit isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "Name is required",
          })}
          error={!!errors?.name}
          helperText={errors?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label="Name"
          name="name"
          defaultValue={userData?.name}
        />
        <TextField
          {...register("avatar", {
            required: "Avatar is required",
          })}
          error={!!errors?.avatar}
          helperText={errors?.avatar?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label="Avatar URL"
          name="avatar"
          defaultValue={userData?.avatar}
        />
      </Box>
    </Edit>
  );
};

export default UserEdit;
