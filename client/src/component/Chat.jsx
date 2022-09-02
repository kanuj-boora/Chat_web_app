import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = () => {
  const ENDPOINT = "localhost:5000";
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  // console.log(location);
  useEffect(() => {
    const { name, room } = location.state;
    console.log(name, room);

    socket = io(ENDPOINT);
    // console.log(socket);

    socket.emit("join", { name, room }, () => {
      // alert(error);
    });

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.state]);

  useEffect(() => {
    socket.on("message", (message) => {
      // console.log(message);
      setMessages([...messages, message]);
    });
    // console.log('welcome msg pushed');
  }, [messages]);

  function handleChange(event) {
    const msg = event.target.value;

    setMessage(() => msg);
    // console.log(msg);
  }

  function handleSend(event) {
    event.preventDefault();

    if (message) {
      socket.emit('userMessage', { message: message }, () => {

      });
    }

    setMessage(() => '');
  }

  console.log(messages);

  return (
    <div>
      <h1>Chat component</h1>
      <input
        type="input"
        placeholder="Enter Message"
        name="messageInput"
        onChange={handleChange}
        value={message}
      />
      <button type="submit" onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
