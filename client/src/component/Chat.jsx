import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import io from "socket.io-client";

let socket;

const Chat = () => {
  const ENDPOINT = "localhost:5000";
  const location = useLocation();
  // console.log(location);
  console.log(location);
  useEffect(()=> {
    const {name, room} = location.state;
    console.log(name, room);

    socket = io(ENDPOINT);
    console.log(socket);

    socket.emit('join', {name, room});
  }, [ENDPOINT, location.state]);
  

  return <h1>Chat component</h1>;
};

export default Chat;
