import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={HomeScreen} />
        {/* <Route path="/chats" component={Chatpage} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
