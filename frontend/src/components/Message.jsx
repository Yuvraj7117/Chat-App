/*eslint-disable*/
import "./message.css";

import ScrollToBottom from "react-scroll-to-bottom"
const Message = ({ messageList,username }) => {
  return (
    <div >
      <ScrollToBottom className="message-container">
        {messageList.map((messageContent,index) => {
          return (
            <div
              key={index}
              className="message"
              id={username === messageContent.author ? "me" : "you"}
            >
              <div>
                <div className="message-content">
                  <h6>{messageContent.message}</h6>
                </div>
                <div className="message-info ">
                  <p id="time">{messageContent.time}</p>
                  <p id="author">
                    {username === messageContent.author
                      ? "ME"
                      : messageContent.author}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </ScrollToBottom>
    </div>
  );
};

export default Message