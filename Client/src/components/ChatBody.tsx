import { useNavigate } from "react-router-dom";
import profilePic from "../../public/propic.jpg";

const ChatBody = ({ messages, typingStatus, lastMessageRef }) => {
  const navigate = useNavigate();

  const handleLeaveChat = () => {
    localStorage.removeItem("userName");
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
        <p>Chat Room</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem("userName") ? (
            <div className="message__chats" key={message.id}>
              <div className="message__sender">
                <img className="avatar" src={profilePic} alt="AVT" />
                <div className="message__content">
                  <p className="avatar__name">You</p>
                  <p className="__message">{message.text}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <div className="message__recipient">
                <img className="avatar" src={profilePic} alt="AVT" />
                <div className="message__content">
                  <p className="avatar__name">{message.name}</p>
                  <p className="__message">{message.text}</p>
                </div>
              </div>
            </div>
          )
        )}

        <div className="message__status">
          <p>{typingStatus}</p>
        </div>
        <div ref={lastMessageRef} />
      </div>
    </>
  );
};

export default ChatBody;
