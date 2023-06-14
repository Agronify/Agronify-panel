import {
  CssBaseline,
  Box,
  Avatar,
  Typography,
  Link,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Container,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import React from "react";
import useAuth from "../../auth/useAuth";
import { useAppSelector } from "../../hooks";
import * as jose from "jose";

export default function LoginPage() {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(useAuth());
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  const authData = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    let redirect = false;
    if (authData.user) {
      let decodedToken = jose.decodeJwt(authData?.user.token!);
      let exp = decodedToken.exp;
      let now = Math.floor(Date.now() / 1000);
      if (exp && exp > now) {
        redirect = true;
      }
    }
    if (redirect) {
      navigate("/knowledge");
    }
    return () => {};
  }, [authData.user]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    auth?.login(email, password).then((res) => {
      setIsLoading(false);
      if (res) {
        console.log("login success");
        navigate("/knowledge");
      }
    });
  };

  return (
    <div className="min-h-screen flex items-center">
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            verticalAlign: "middle",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            <Button
              color="primary"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: "#1976d2 !important" }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </div>
  );
}
