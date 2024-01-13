import { Visibility, VisibilityOff } from "@mui/icons-material";
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
import { useState } from "react";

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  return (
    <Paper
      elevation={4}
      style={{
        backgroundColor: "white",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
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
          id="outlined-required"
          label="Email Id"
          placeholder="Enter Your Email Id"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            placeholder="Enter Your Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
            id="outlined-adornment-password"
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

        <Button variant="contained">Login</Button>
        <Button variant="outlined">Reset</Button>
      </Grid>
    </Paper>
  );
};

export default Login;
