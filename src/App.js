import React, { useState, useRef } from "react";
import "./App.css";
import EmojiPicker from "emoji-picker-react";

const user_list = ["Alan", "Bob", "Carol", "Dean", "Elin"];

function App() {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedUser, setSelectedUser] = useState("");
  const messageInputRef = useRef(null);
  const [showUserList, setShowUserList] = useState(false);

  const handleInputChange = (event) => {
    const inputValue = event.target.value;
    setMessage(inputValue);

    if (inputValue.endsWith("@")) {
      setShowUserList(true);
    } else {
      setShowUserList(false);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      const randomUser =
        user_list[Math.floor(Math.random() * user_list.length)];
      const newMessage = {
        user: randomUser,
        text: message,
        likes: 0,
        timestamp: new Date().toLocaleTimeString(),
      };
      setChatMessages([...chatMessages, newMessage]);
      setMessage("");
    }
  };

  const handleLike = (index) => {
    const updatedMessages = [...chatMessages];
    updatedMessages[index].likes += 1;
    setChatMessages(updatedMessages);
  };

  const getInitials = (name) => {
    const names = name.split(" ");
    return names
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleEmojiClick = (emojiObject, event) => {
    const emoji = emojiObject.emoji;
    setMessage((prevMessage) => prevMessage + emoji);
    setShowEmojiPicker(false);
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleUserSelection = (user) => {
    setSelectedUser(user);
    setMessage(message + user);
    setShowUserList(false);
    messageInputRef.current.focus();
  };

  return (
    <div className="App">
      <div className="conversation-header">
        <div className="group-details">
          <img src="/user-group.svg" alt="Group Icon" className="group-icon" />
          <div className="conversation-details">
            <div className="group-info">
              <h1 className="conversation-name">Group</h1>
              <p className="conversation-bio">Chat about various topics</p>
            </div>
          </div>
        </div>
        <div className="user-count">4/100</div>
      </div>
      <div className="message-thread">
        {chatMessages.map((chat, index) => (
          <div className="message" key={index}>
            <div className="detail-container">
              <div className="user-details">
                <div className="user-icon">{getInitials(chat.user)}</div>
                <span className="username">{chat.user}</span>
                <span className="timestamp">{chat.timestamp}</span>
              </div>
              <div className="like-container">
                <button
                  className="like-button"
                  onClick={() => handleLike(index)}
                >
                  Like ({chat.likes})
                </button>
              </div>
            </div>
            <div className="message-actions">
              <div className="message-content">{chat.text}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="message-input">
        <input
          type="text"
          value={message}
          className="text-input"
          placeholder="Enter your message"
          onChange={handleInputChange}
          ref={messageInputRef}
        />
        {showUserList && (
          <ul className="user-list">
            {user_list.map((user) => (
              <li
                key={user}
                className="user-list-item"
                onClick={() => handleUserSelection(user)}
              >
                {user}
              </li>
            ))}
          </ul>
        )}
        <div className="emoji-picker-container">
          <div className="EmojiPicker">
            {showEmojiPicker && (
              <EmojiPicker onEmojiClick={handleEmojiClick} disableSearchBar />
            )}
          </div>
          <button className="emoji-picker-button" onClick={toggleEmojiPicker}>
            🙂
          </button>
        </div>
        <button className="send-button btn" onClick={handleSendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
