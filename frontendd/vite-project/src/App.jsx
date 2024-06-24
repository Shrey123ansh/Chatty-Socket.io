import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { io } from "socket.io-client";
import { send } from "process";
import { nanoid } from "nanoid";

const socket = io("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const userName = nanoid(4);

  const sendChat = (e) => {
    e.preventDefault();
    socket.emit("chat", { message, userName });
    setMessage("");
  };

  useEffect(() => {
    socket.on("chat", (payload) => {
      setChat([...chat, payload]);
    });

    console.log(chat);
  });

  return (
    <>
      <div>hello</div>
      <h1>Chatty app</h1>
      {chat.map((payload, index) => {
        return (
          <p key={index}>
            {" "}
            {payload.message}:<span>id: {payload.userName}</span>
          </p>
        );
      })}
      <form onSubmit={sendChat}>
        <input
          type="text"
          name="chat"
          placeholder="send text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />

        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default App;
