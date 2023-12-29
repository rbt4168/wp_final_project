import axios from "axios";
import React, { useState } from "react";

const Input = ( {user, cid, oppouid} ) => {
  const [text, setText] = useState("");

  const handleSend = async () => {
    console.log(cid, oppouid);
    axios.post("/api/msg/message", {uid: user.uid, cid: cid, content: text, oppo: oppouid}).then((res)=>{
      console.log(res);
      setText("");
    })
  };

  const handleKeyPress = (event) => {
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
    <div style={{ marginTop: "15px" }}>
      <input
        type="text"
        placeholder="Type something..."
        value={text}
        onChange={(e)=>setText(e.target.value)}
        onKeyDown={handleKeyPress}
        style={{ fontSize: 20 , width: "170px" }}
      />
      <button style={{ fontSize: 20 , width: "100px", marginLeft:"20px" }} onClick={handleSend}>Send</button>
    </div>
  );
};

export default Input;
