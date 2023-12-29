import React, {useEffect, useState} from "react";
import SearchInput from "./SearchInput";
import ChatList from "./ChatList";

import axios from "axios";

import PusherClient from "pusher-js";

import { NEXT_PUBLIC_PUSHER_KEY, NEXT_PUBLIC_PUSHER_CLUSTER } from "@/lib/utils";

export const pusherClient = new PusherClient(NEXT_PUBLIC_PUSHER_KEY, {
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
});

const Sidebar = ( {user, setCid, setOppo, oppouid, setOppouid} ) => {
  const [oppos, setOppos] = useState([]);

  useEffect(()=>{
    axios.post("/api/msg/chats", {uid: user.uid}).then((res)=>{
      let iuser = JSON.parse(res.data.message);
      console.log(iuser);
      setOppos(iuser);
    }).catch((e)=>console.error(e));

    const channel = pusherClient.subscribe(`ch_${user.uid}`);

    pusherClient.connection.bind("state_change", function (states) {
      if(states.current === "disconnected") {
        pusherClient.connect();
      }
    });

    channel.bind("evt", data => {
      console.log(data);
      axios.post("/api/msg/chats", {uid: user.uid}).then((res)=>{
        let iuser = JSON.parse(res.data.message);
        console.log(iuser);
        setOppos(iuser);
      }).catch((e)=>console.error(e));
    });

    return ()=>{
      pusherClient.unsubscribe(`ch_${user.uid}`);
    }

  }, [user])

  return (
    <div className="sidebar" style={{ marginLeft: "20px", border: "1px solid black", width: "300px", padding:"15px" }}>
       <SearchInput user={user} />
       <ChatList selfuid={user.uid} users={oppos} setCid={setCid} setOppo={setOppo} oppouid={oppouid} setOppouid={setOppouid}/>
    </div>
  );
};

export default Sidebar;
