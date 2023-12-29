import React from "react";

var urlRegex = /((http[s]?|ftp):\/)\/?([^:\/\s]+)(?::([0-9]+))?((\/\w+)*\/)?([\w\-\.]*)?([#?\w\=]+)?([\&\w=\w]+.*)?([\w\+\-\/\%]*)?[A-Za-z0-9_\/]/g;

const Message = ({ message, uid, opendia }) => {
  const show = () => {
    if(message.uid === uid) {
      return ( message.visible === 4 || message.visible === 3 ||
        message.visible === 2 || message.visible === -1 );
    } else {
      return ( message.visible === 4 || message.visible === 3 ||
        message.visible === 1 || message.visible === -1 );
    }
  }
  
  return (
    <>
      {show() ? (
        <div>
          <p
            onMouseDown={(e)=>{opendia(message._id, message.uid === uid)}}
            onClick={(e)=>{opendia(message._id, message.uid === uid)}}
            style={{ padding: "10px", border: "1px solid black", borderRadius: "10px" ,textAlign: ((message.uid === uid) ? "right" : "left")}}>
            {message.content.match(urlRegex)?<a target="_blank" href={message.content}>{message.content}</a>:message.content}
          </p>
        </div>
      ) : ( <div>
        <p style={{ color: "grey", padding: "10px", border: "1px solid black", borderRadius: "10px" ,textAlign: ((message.uid === uid) ? "right" : "left")}}>
            訊息已不可見
        </p>
      </div> )}
    </>
  );
};

export default Message;
