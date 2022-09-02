import React, { useState } from "react";
import { Link } from "react-router-dom";

const Join = () => {
  const [detail, setData] = useState({ name: "", room: "" });

  function handleChange(event) {
    const { name, value } = event.target;
    setData((prev) => {
      return { ...prev, [name]: value };
    });
    // console.log(detail);
  }

  function handleSubmit (event) {
    console.log("submit button pressed");
  }

  return (
    <div className="joinComponent">
      <h1>Join component</h1>
      <div className="inputDiv">
        <input
          name="name"
          placeholder="Enter Name"
          className="nameField"
          onChange={handleChange}
          value={detail.name}
        />
        <input
          name="room"
          placeholder="Enter Room"
          className="roomField"
          onChange={handleChange}
          value={detail.room}
        />
        <Link onClick={(event) => (!detail.name || !detail.room) ? event.preventDefault() : null} to="/chat" state={{name: detail.name, room: detail.room}}>
        {/* <Link onClick={(event) => (!detail.name || !detail.room) ? event.preventDefault() : null} to={`/chat?name=${detail.name}&room=${detail.room}`}> */}
          <button type="submit">Join</button>
        </Link>
        
      </div>
    </div>
  );
};

export default Join;
