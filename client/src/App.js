import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io("http://localhost:3001");

function App() {
  const [room, setRoom] = useState("");
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (!room || !username) return;
    socket.emit("join_room", room);
    setShowChat(true);
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join Chat Room </h3>
          <input
            type="text"
            placeholder="Your name..."
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => setRoom(e.target.value)}
            onKeyPress={(e) => {
              e.key === "Enter" && joinRoom();
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
