import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatScreen from "./components/ChatScreen";
import AuthScreen from "./components/auth/AuthScreen";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <div className="mainContainer">
        <Toaster />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/chat" element={<ChatScreen />}></Route>
          <Route path="/auth" element={<AuthScreen />}></Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
