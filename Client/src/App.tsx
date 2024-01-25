import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { Toaster } from "react-hot-toast";
import ChatScreen from "./screens/ChatScreen";
import ChatProvider from "../src/context/ChatProvider";
import React from "react";

function App() {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <ChatProvider>
          <Routes>
            <Route path="/" Component={HomeScreen} />
            <Route path="/chats" Component={ChatScreen} />
          </Routes>
        </ChatProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
