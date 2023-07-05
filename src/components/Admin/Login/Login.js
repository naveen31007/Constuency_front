import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { InputAdornment, IconButton } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import { Provider } from "../../Context";

export default function Login() {
  const context = useContext(Provider);
  const [showPassword, setShowPassword] = useState(false);

  const loginhandles = async (data) => {
    try {
      const newData = {
        emailId: data.usercode,
        password: data.password,
      };
      const resp = await context.loginhandle(newData);
      // Handle successful login
    } catch (error) {
      toast.error("Login failed. Please try again."); // Show error toast
    }
  };

  const validationSchema = Yup.object().shape({
    usercode: Yup.string().required("Username is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Container
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#11a6d4",
      }}
    >
      <Card style={{ width: "400px", borderRadius: 10 }}>
        <CardContent>
          <Box
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 16,
            }}
          >
            <AccountBoxIcon style={{ fontSize: 80, color: "black" }} />
          </Box>
          <Typography
            component="h3"
            variant="h6"
            style={{ marginBottom: 16 }}
          >
            <b>
              <i>Sign in...</i>{" "}
            </b>
          </Typography>
          <Formik
            initialValues={{ usercode: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={loginhandles} // Call loginhandles directly without passing values
          >
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                <TextField
                  margin="normal"
                  fullWidth
                  id="usercode"
                  label="Username"
                  name="usercode"
                  autoComplete="usercode"
                  autoFocus
                  variant="outlined"
                  style={{ marginBottom: "1rem" }}
                  value={values.usercode}
                  onChange={handleChange}
                  error={touched.usercode && Boolean(errors.usercode)}
                  helperText={touched.usercode && errors.usercode}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"} // Toggle between "text" and "password" type
                  id="password"
                  autoComplete="password"
                  variant="outlined"
                  style={{ marginBottom: "1rem" }}
                  value={values.password}
                  onChange={handleChange}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={handleTogglePassword}>
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  style={{ marginTop: "0.5rem", marginBottom: "1rem" }}
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  style={{
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    marginTop: "1rem",
                    marginBottom: "0.5rem",
                    "&:hover": {
                      backgroundColor: "#115293",
                    },
                  }}
                  disabled={isSubmitting}
                >
                  Sign In
                </Button>
              </form>
            )}
          </Formik>
        </CardContent>
      </Card>
      <ToastContainer position="top-right" autoClose={3000} />
    </Container>
  );
}

