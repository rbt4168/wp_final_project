import React, { useEffect, useState } from "react";
import Message from "./Message";
import axios from "axios";

import PusherClient from "pusher-js";

import { NEXT_PUBLIC_PUSHER_KEY, NEXT_PUBLIC_PUSHER_CLUSTER } from "@/lib/utils";

export const pusherClient = new PusherClient(NEXT_PUBLIC_PUSHER_KEY, {
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
});

const Messages = ( {cid, uid} ) => {
  const [ msgs, setMsgs ] = useState([]);

  useEffect(()=>{
    axios.post("/api/msg/gmsg", {cid: cid}).then((res)=>{
      setMsgs(JSON.parse(res.data.message));
    }).catch((e)=>console.error(e));

    const channel = pusherClient.subscribe(`ch_${cid}`);

    pusherClient.connection.bind("state_change", function (states) {
      if(states.current === "disconnected") {
        pusherClient.connect();
      }
    });

    channel.bind("evt", data => {
      console.log(data);
      axios.post("/api/msg/gmsg", {cid: cid}).then((res)=>{
        setMsgs(JSON.parse(res.data.message));
      }).catch((e)=>console.error(e));
    });

    return ()=>{
      pusherClient.unsubscribe(`ch_${cid}`);
    }
  }, [ cid ]);

  useEffect(()=>{
    let scroll_ele = document.getElementById("mxmsg");
    scroll_ele.scrollTop = scroll_ele.scrollHeight? scroll_ele.scrollHeight: 0;
  },[ msgs ])
  
  
  const [opendia, setOpendia] = useState(false);
  const [diaid, setDiaid] = useState("");
  const [isself, setIsself] = useState("");

  const open_dialog = (id, iss) => {
    console.log(id);
    setDiaid(id);
    setOpendia(true);
    setIsself(iss);
  }

  const close_dialog = () => {
    setOpendia(false);
  }
  
  const reset_visible = (val)=> {
    axios.post("/api/msg/rvis", {cid: cid, id: diaid, vis: val}).then((res)=>{
      console.log(res);
    }).catch((e)=>console.error(e));
    close_dialog();
  }

  return (
    <>
    <dialog open={opendia}>
      <h4>編輯訊息(id:{diaid})</h4>
      {(isself)?
      (<>
      <button onClick={()=>reset_visible(1)}>對自己隱藏</button>
      <button onClick={()=>reset_visible(0)}>對所有人收回</button>
      </>):(<></>)
      }
      <button onClick={()=>reset_visible(-1)}>設為公告</button>
      <button onClick={close_dialog}>Close</button>
    </dialog>
    {msgs.map((m) => {
      if(m.visible === -1) {
        return (<div style={{ marginTop: "10px", padding: "5px", fontSize: "25px" , fontWeight: 600, border:"1px solid black"}}>公告: {m.content}</div> );
      } else return (<></>);
    })}
    <div id="mxmsg" className="messages" style={{ marginTop: "10px",border: "1px solid black" , height: "60vh", overflow:"scroll" , padding:"10px" }}>
      
      {msgs.map((m) => (
        <Message message={m} key={m.id} uid={uid} opendia={open_dialog} />
      ))}
    </div>
    </>
  );
};

export default Messages;
