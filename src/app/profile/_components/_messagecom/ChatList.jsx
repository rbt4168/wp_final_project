import React from "react";
import axios from "axios";

const ChatListUnit = ( {user, selfuid, setCid, setOppo, oppouid, setOppouid} ) => {
  function handler () {
    setCid(user.cid);
    setOppo(user.name);
    // alert(JSON.stringify(user));
    axios.post("/api/msg/euser", {account: user.name}).then((res)=>{
      if (res.data.message === "e") {
        // user exist
        let quid = res.data.uid;
        let qacc = res.data.account;
        console.log(quid);
        setOppouid(res.data.uid);

      } else if (res.data.message === "n") {
        alert("no such user.");
      }
    }).catch((e)=>{
      console.error(e);
    })
  }

  function handle_remove() {
    console.log(`remove uid1:${selfuid} uid2:${oppouid} cid: ${user.cid}`);
    axios.post("/api/msg/dchat", {uid1: selfuid, uid2: oppouid, cid: user.cid}).then((res)=>{
      console.log(res);
    }).catch((e)=>console.error(e))
  }

  return (
    <div  onClick={handler} style={{ border:"solid 1px black", marginTop: "15px", padding:"10px", display: "flex", justifyContent: "space-between" }}>
      <div>
        <div style={{fontSize: 25 , fontWeight: 600}}>{user.name}</div>
        {user.last_message===""?"New Chat!":user.last_message}
      </div>
      <button onClick={handle_remove}>Del</button>
    </div>
  )
}

const ChatList = ({ selfuid, users, setCid, setOppo, setOppouid, oppouid }) => {
  console.log(users);
  console.log(users.sort((a, b) => { return b.timestamp - a.timestamp }));
  return (
    <div>
      {users.map((user, index) => (
        <ChatListUnit key={index} selfuid={selfuid} user={user} setCid={setCid} setOppo={setOppo} oppouid={oppouid} setOppouid={setOppouid} />
      ))}
    </div>
  );
};

export default ChatList;
