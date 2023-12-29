import Messages from "./Messages";
import Input from "./Input";
import React from 'react'

const ChatView = ( {user, cid, oppo, oppouid} ) => {
  return (
    <div style={{ marginLeft: "20px", width: "300px" }}>
      <div style={{fontSize: 35 , fontWeight: 600}}>
        {(cid === "")?"Lobby":oppo}
      </div>
      <Messages cid={cid} uid={user.uid}/>
      <Input user={user} cid={cid} oppouid={oppouid}/>
    </div>
  )
}

export default ChatView