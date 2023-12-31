"use client"

import { Box } from "@mui/material";

import { main_theme } from "@/lib/themes";
import { url_regex } from "@/lib/utils";

function Message(props: any) {
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
            onMouseDown={()=>{opendia(message._id, message.uid === uid)}}
            onClick={()=>{opendia(message._id, message.uid === uid)}}
            style={{ padding: "10px", background: (message.uid === uid) ? main_theme.palette.primary.light : main_theme.palette.secondary.light, borderRadius: "10px" ,textAlign: ((message.uid === uid) ? "right" : "left")}}>
            {message?.content?.match(url_regex)?<a target="_blank" href={message.content} rel="noreferrer">{message.content}</a>:message.content}
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
}

export default Message;
