import { useEffect, useState, useRef } from "react";
import ChatBar from "./ChatBar";
import ChatBody from "./ChatBody";
import ChatFooter from "./ChatFooter";
import { socket } from "../utils/socketIO.js";

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [typingStatus, setTypingStatus] = useState("");
  const lastMessageRef = useRef(null);

  useEffect(() => {
    socket.on("messageResponse", (data) => setMessages([...messages, data]));
  }, [socket, messages]);

  useEffect(() => {
    socket.on("typingResponse", (data) => setTypingStatus(data));
  }, [socket]);

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat">
      <ChatBar socket={socket} />
      <div className="chat__main">
        <div>
          <ChatBody
            messages={messages}
            typingStatus={typingStatus}
            lastMessageRef={lastMessageRef}
          />
        </div>
        <ChatFooter socket={socket} />
      </div>
    </div>
  );
};

export default ChatScreen;
