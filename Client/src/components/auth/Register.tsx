import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Avatar,
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
import commonStyles from "../../utils/commonStyles.js";
import axios from "axios";
import { LoadingButton } from "@mui/lab";
import toast from "react-hot-toast";
import { checkEmail } from "../../utils/constants.js";

const Register = ({ changeTabValue }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  // const [userPasswordConfirm, setUserPasswordConfirm] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const changeTabVal = () => {
    changeTabValue(1);
  };

  // function upload avatar to cloudinary and get image url
  const uploadCloudaryProfile = async (photoData: any) => {
    try {
      setLoading(true);
      const data = new FormData();
      data.append("file", photoData);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dqficjwys");
      const picData = await axios
        .post("https://api.cloudinary.com/v1_1/dqficjwys/image/upload", data)
        .then((response) => response.data);
      setProfilePic(picData.url);
      toast.success("Profile Pic Added");
      setLoading(false);
    } catch (error) {
      console.log("--error--", error);
      setLoading(false);
    }
  };
  const onSubmitFormData = async () => {
    setLoading(true);
    try {
      const data = {
        name: userName,
        email: userEmail,
        password: userPassword,
        image: profilePic,
      };
      const result = await axios
        .post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`, data)
        .then((res) => res.data);
      if (result.success) {
        toast.success(result.message);
        setLoading(false);
        changeTabVal();
      }
    } catch (error) {
      setLoading(false);
      toast.success(error.message);
    }
  };

  // function return first 2 letter of username
  // const getNamedAvatar = (username: string) => {
  //   const name = username.split(" ");
  //   const data = name[0].substring(0, 1) + name[1].substring(0, 1);
  //   return data;
  // };
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
        <Paper
          elevation={3}
          style={{
            alignSelf: "center",
            borderRadius: "50%",
            padding: 2,
            position: "relative",
          }}
        >
          <Avatar
            alt={userName.toUpperCase()}
            src={profilePic}
            sx={{ width: 56, height: 56 }}
          />
          <label className="custom-file-upload">
            +
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={(e) => uploadCloudaryProfile(e.target.files[0])}
            />
          </label>
        </Paper>
        <TextField
          size="small"
          label="Name"
          placeholder="Enter Your Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <TextField
          size="small"
          label="Email Id"
          placeholder="Enter Your Email"
          error={userEmail ? checkEmail(userEmail) : false}
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
        />
        <FormControl variant="outlined">
          <InputLabel size="small" htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            size="small"
            placeholder="Enter Your Password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
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
        {/* <FormControl variant="outlined">
          <InputLabel size="small" htmlFor="outlined-adornment-password">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            size="small"
            error={userPassword !== userPasswordConfirm}
            placeholder="Confirm Your Password"
            value={userPasswordConfirm}
            onChange={(e) => setUserPasswordConfirm(e.target.value)}
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
        </FormControl> */}
        <LoadingButton
          onClick={onSubmitFormData}
          loading={loading}
          loadingPosition="center"
          variant="contained"
          disabled={
            !userName || !userEmail || !userPassword || checkEmail(userEmail)
            //  || !userPasswordConfirm
          }
        >
          Register
        </LoadingButton>
        <Button variant="outlined">Sign Up Options</Button>
      </Grid>
    </Paper>
  );
};

export default Register;
