import { Button, Grid, Input, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function InputStable( props: any ) {
  const {user, cid, oppouid} = props;

  const [text, setText] = useState("");

  const handleSend = async () => {
    console.log(cid, oppouid);
    axios.post("/api/msg/message", {uid: user.uid, cid: cid, content: text, oppo: oppouid}).then((res)=>{
      console.log(res);
      setText("");
    })
  };

  const handleKeyPress = (event: any) => {
    if(event.key === 'Enter'){
      console.log('enter press here! ');
      console.log(cid, oppouid);
      if( text !== "" ) {
        axios.post("/api/msg/message", {uid: user.uid, cid: cid, content: text, oppo: oppouid}).then((res)=>{
          console.log(res);
          setText("");
        })
      }
    }
  }

  return (
    <Grid container sx={{ width: "100%"}}>
      <Grid item md={10}>
        <Input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e:any)=>setText(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ fontSize: 20 , width: "90%" }}
        />
      </Grid>
      <Grid item md={2}>
        <Button onClick={handleSend} component="label" variant="contained">
          Send
        </Button>
        <Button onClick={handleSend} component="label" variant="contained">
          Donate
        </Button>
      </Grid>
    </Grid>
  );
};
