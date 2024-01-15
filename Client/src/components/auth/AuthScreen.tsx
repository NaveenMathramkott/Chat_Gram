import { Grid, Paper, Tab, Tabs } from "@mui/material";
import Login from "./Login";
import { useState } from "react";
import Register from "./Register";
import commonStyles from "../../utils/commonStyles.js";

const AuthScreen = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Grid
        container
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          overflowX: "hidden",
        }}
      >
        <Grid
          item
          xs={12}
          md={8}
          lg={8}
          gap={4}
          style={{
            flexDirection: "column",
            ...commonStyles.flexCenter,
          }}
        >
          <Paper
            elevation={3}
            style={{
              backgroundColor: "white",
              height: "60px",
              width: "80%",
              borderRadius: "10px",
              ...commonStyles.flexCenter,
            }}
          >
            <h3>CHAT ROOM</h3>
          </Paper>

          <Paper
            elevation={4}
            style={{
              backgroundColor: "white",
              width: "80%",
              borderRadius: "10px",
              padding: "10px",
            }}
          >
            <Tabs value={value} onChange={handleChange} centered>
              <Tab label="LOGIN" value={1} />
              <Tab label="REGISTER" value={2} />
            </Tabs>
            {value === 1 ? (
              <Login />
            ) : (
              <Register changeTabValue={(val: number) => setValue(val)} />
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default AuthScreen;
