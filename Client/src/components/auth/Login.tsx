import { Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import commonStyles from "../../utils/commonStyles.js";
import { checkEmail } from "../../utils/constants.js";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const onSubmitFormData = async () => {
    setLoading(true);
    try {
      const data = {
        email: userEmail,
        password: userPassword,
      };
      const result = await axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, data)
        .then((res) => res.data);
      if (result.success) {
        localStorage.setItem("user", JSON.stringify(result));
        toast.success(result.message);
        setLoading(false);
      }
    } catch (error) {
      toast.success(error.message);
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={4}
      style={{
        backgroundColor: "white",
        width: "100%",
        ...commonStyles.flexCenter,
      }}
    >
      <Grid
        gap={2}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "80%",
          alignItems: "stretch",
          justifyContent: "center",
        }}
        padding={2}
      >
        <TextField
          required
          size="small"
          label="Email Id"
          placeholder="Enter Your Email Id"
          value={userEmail}
          error={userEmail ? checkEmail(userEmail) : false}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <FormControl variant="outlined">
          <InputLabel size="small" htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            placeholder="Enter Your Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            size="small"
            type={showPassword ? "text" : "password"}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>

        <LoadingButton
          size="small"
          onClick={onSubmitFormData}
          loading={loading}
          loadingPosition="center"
          variant="contained"
          disabled={!userPassword || checkEmail(userEmail)}
        >
          Login
        </LoadingButton>
        <Button variant="outlined">Reset Password</Button>
      </Grid>
    </Paper>
  );
};

export default Login;
