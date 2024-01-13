import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ChatScreen from "./components/ChatScreen";
import AuthScreen from "./components/auth/AuthScreen";

function App() {
  return (
    <BrowserRouter>
      <div>
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
