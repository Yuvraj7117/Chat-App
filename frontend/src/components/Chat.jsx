/*eslint-disable*/
import { useEffect, useState } from "react";
import Message from "./Message";
import { AiOutlineSend, AiOutlineWechat } from "react-icons/ai";
 

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  
  const minutes = (min) => {
    if (min < 10) {
      min = "0" + min;
      return min
    } else {
      return min
    }
  }
  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          minutes(new Date(Date.now()).getMinutes()),
      };

      await socket.emit("send_message", messageData);
      
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    return () => {
      socket.off()
    }
  }, [socket]);

  return (
    <div className="border">
      <div
        className="d-flex border border-bottom"
    
      >
        <AiOutlineWechat className="fs-1 text-primary mx-4" />
        <div className="w-75 ">
          <h2>Chat Application</h2>
        </div>
        <p className="px-3 mt-3 text-success">{username}</p>
      </div>
      <div className="my-3">
        <Message username={username} messageList={messageList} />
      </div>
      <div className="py-4 border bg-secondary">
        <input
          className="w-75 px-2 mx-2 rounded"
          type="text"
          value={currentMessage}
          placeholder="Type a Messsage..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button
          onClick={sendMessage}
          className="w-25 mt-3 bg-primary rounded py-2"
        >
          <AiOutlineSend style={{ color: "purple",fontSize:"30px"}}/>
        </button>
      </div>
    </div>
  );
}

export default Chat;
