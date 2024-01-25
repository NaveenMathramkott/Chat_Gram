import {
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import Login from "../components/auth/Login";
import Register from "../components/auth/Register";
import commonStyles from "../constants/commonStyles";
import image from "../assets/background.jpg";

const HomeScreen = () => {
  const navigation = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigation("/chats");
  }, [navigation]);

  return (
    <Box
      w={"100vw"}
      h={"100vh"}
      bgImage={image}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"flex-start"}
    >
      <Box>
        <Box
          display="flex"
          justifyContent="center"
          p={3}
          bg="white"
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          boxShadow={commonStyles.shadow}
        >
          <Text fontSize="4xl" fontWeight="600">
            Chat Gram
          </Text>
        </Box>
        <Box
          bg="white"
          w="100%"
          p={4}
          borderRadius="lg"
          boxShadow={commonStyles.shadow}
        >
          <Tabs isFitted>
            <TabList mb="1em">
              <Tab>Login</Tab>
              <Tab>Register</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Register />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default HomeScreen;
