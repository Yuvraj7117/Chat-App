import "./App.css";
import io from "socket.io-client";
import { useState } from "react";
import Chat from "./components/Chat";

const socket = io.connect("http://localhost:5000");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer border rounded" style={{backgroundColor:"black"}}>
          <h3 className=" bg-secondary text-light rounded">Join A Chat</h3>
          <input
            className="my-4 rounded"
            type="text"
            placeholder="Enter Your Name..."
            onChange={(event) => {
              setUsername(event.target.value.toLocaleUpperCase());
            }}
          />
          <br/>
          <input
            className="rounded "
            type="text"
            placeholder="Room ID..."
            onChange={(event) => {
              setRoom(event.target.value);
            }} 
          />
          <br/>
          <button className="btn btn-primary my-5" onClick={joinRoom}>Join Room</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </div>
  );
}

export default App;
