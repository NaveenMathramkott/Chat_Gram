import { Box } from "@chakra-ui/layout";
import React, { useState } from "react";
import MyChatbox from "../components/MyChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/SideDrawer";
import { ChatState } from "../context/ChatProvider";
import image from "../../public/background.jpg";

const ChatScreen = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <Box style={{ width: "100%" }} bgImage={image} p={"5px"}>
      {user && <SideDrawer />}
      <Box
        display="flex"
        justifyContent="space-between"
        w="100%"
        h="91.5vh"
        pt="5px"
      >
        {user && <MyChats fetchAgain={fetchAgain} />}
        {user && (
          <MyChatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )}
      </Box>
    </Box>
  );
};

export default ChatScreen;
