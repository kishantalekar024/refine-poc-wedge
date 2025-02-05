import * as React from "react";
import { useLogin } from "@refinedev/core";
import {
  Button,
  Card,
  CardContent,
  Box,
  Typography,
  Container,
} from "@mui/material";

export const Login: React.FC = () => {
  const { mutate: login, isLoading } = useLogin();

  const handleLogin = () => {
    login({ email: "demo@example.com", password: "demodemo" });
  };

  return (
    <Box component="div">
      <Container
        component="main"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100dvh",
          padding: "16px",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <Card>
          <CardContent sx={{ p: "32px", "&:last-child": { pb: "32px" } }}>
            <Typography
              component="h1"
              variant="h5"
              align="center"
              color="primary"
              fontWeight={700}
              gutterBottom
            >
              Sign in to your account
            </Typography>

            <Button
              onClick={handleLogin}
              fullWidth
              variant="contained"
              disabled={isLoading}
              sx={{ mt: "24px" }}
            >
              Sign in
            </Button>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};
