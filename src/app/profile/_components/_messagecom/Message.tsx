import { main_theme } from "@/lib/themes";
import { Box } from "@mui/material";
import React from "react";

var urlRegex = /((http[s]?|ftp):\/)\/?([^:\/\s]+)(?::([0-9]+))?((\/\w+)*\/)?([\w\-\.]*)?([#?\w\=]+)?([\&\w=\w]+.*)?([\w\+\-\/\%]*)?[A-Za-z0-9_\/]/g;

const Message = (props: any) => {
  const { message, uid, opendia } = props;

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
        <Box sx={{ width: "100%" }}>
          <p
            onMouseDown={(e)=>{opendia(message._id, message.uid === uid)}}
            onClick={(e)=>{opendia(message._id, message.uid === uid)}}
            style={{ padding: "10px", background: (message.uid === uid) ? main_theme.palette.primary.light : main_theme.palette.secondary.light, borderRadius: "10px" ,textAlign: ((message.uid === uid) ? "right" : "left")}}>
            {message?.content?.match(urlRegex)?<a target="_blank" href={message.content}>{message.content}</a>:message.content}
          </p>
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <p style={{ color: "grey", padding: "10px", borderRadius: "10px" ,textAlign: ((message.uid === uid) ? "right" : "left")}}>
              訊息已不可見
          </p>
        </Box> 
      )}
    </>
  );
};

export default Message;
