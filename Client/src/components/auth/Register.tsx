import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Paper,
  TextField,
} from "@mui/material";
import { useState } from "react";
import commonStyles from "../../utils/commonStyles.js";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [profilePic, setProfilePic] = useState();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
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
          id="outlined-required"
          label="Name"
          placeholder="Enter Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          required
          id="outlined-required"
          label="Email Id"
          placeholder="Enter Your Email"
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
        <FormControl variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            placeholder="Confirm Your Password"
            value={userPasswordConfirm}
            onChange={(e) => setUserPasswordConfirm(e.target.value)}
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
            label="Confirm Password"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Upload your Avatar</FormLabel>
          <input
            type="file"
            name="file"
            accept="image/*"
            onChange={(e) => setProfilePic(e.target.files[0])}
          />
        </FormControl>

        <Button variant="contained">Login</Button>
        <Button variant="outlined">Reset</Button>
      </Grid>
    </Paper>
  );
};

export default Register;
