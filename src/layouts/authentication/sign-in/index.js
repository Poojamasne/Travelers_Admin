import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/logos/logo.jpeg";
import logo from "assets/images/logos/logo.jpeg";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = process.env.REACT_APP_API_BASE_URL || "https://traveller-api.synoventum.site";

  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") return;
    setOpenSnackbar(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const payload = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch(`${BASE_URL}/v1/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.status) {
        // Store token and admin details in localStorage
        localStorage.setItem("token", data.data.token);
        localStorage.setItem("id", data.data.admin.id);
        localStorage.setItem("name", data.data.admin.name);
        localStorage.setItem("email", data.data.admin.email);
        localStorage.setItem("role", data.data.admin.role);

        // Store permissions in localStorage
        localStorage.setItem("permissions", JSON.stringify(data.data.admin.permissions));
        localStorage.setItem("analytics", data.data.admin.permissions.analytics);
        localStorage.setItem("ride_analytics", data.data.admin.permissions.ride_analytics);
        localStorage.setItem("dynamic_pricing", data.data.admin.permissions.dynamic_pricing);
        localStorage.setItem("ride_management", data.data.admin.permissions.ride_management);
        localStorage.setItem("user_management", data.data.admin.permissions.user_management);
        localStorage.setItem("dispute_management", data.data.admin.permissions.dispute_management);
        localStorage.setItem(
          "promotion_management",
          data.data.admin.permissions.promotion_management
        );

        setSnackbarMessage(data.message);
        setSnackbarSeverity("success");
        setOpenSnackbar(true);

        // Only navigate after successful login
        setTimeout(() => navigate("/analytics"), 2000);
      } else {
        setErrorMessage(data.message);
        setSnackbarMessage(data.message);
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrorMessage("Connection error. Please try again.");
      setSnackbarMessage("Connection error. Please try again.");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          borderRadius="lg"
          mx={2}
          mt={1}
          p={2}
          mb={1}
          textAlign="center"
          sx={{
            backgroundColor: "#E8F5E9",
            boxShadow: "0px 4px 20px rgba(76, 175, 80, 0.3)",
          }}
        >
          <MDBox mb={5}>
            <img src={logo} alt="Logo" style={{ maxWidth: "100px", marginBottom: "5px" }} />
          </MDBox>
          <MDTypography variant="h4" fontWeight="medium" color="dark" mt={1}>
            Admin Login
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={handleSubmit}>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                value={email}
                onChange={handleEmailChange}
                required
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={handlePasswordChange}
                required
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                fullWidth
                type="submit"
                disabled={isLoading}
                sx={{
                  backgroundColor: "#66BB6A",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#4CAF50" },
                }}
              >
                {isLoading ? "Logging in..." : "Log in"}
              </MDButton>
            </MDBox>
            {errorMessage && (
              <MDTypography variant="body2" color="error" textAlign="center">
                {errorMessage}
              </MDTypography>
            )}
          </MDBox>
        </MDBox>
      </Card>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </BasicLayout>
  );
}

export default Basic;
