import React, {useEffect, useState} from "react";
import ChatList from "./ChatList";
import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";

import axios from "axios";

import PusherClient from "pusher-js";

import { NEXT_PUBLIC_PUSHER_KEY, NEXT_PUBLIC_PUSHER_CLUSTER } from "@/lib/utils";

export const pusherClient = new PusherClient(NEXT_PUBLIC_PUSHER_KEY, {
  cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
});

export default function Sidebar(props:any) {
  const {user, setCid, setOppo, oppouid, setOppouid} = props;
  const [oppos, setOppos] = useState([]);

  useEffect(()=>{
    axios.post("/api/msg/chats", {uid: user.uid}).then((res)=>{
      let iuser = JSON.parse(res.data.message);
      console.log(iuser);
      setOppos(iuser);
    }).catch((e)=>console.error(e));

    const channel = pusherClient.subscribe(`ch_${user.uid}`);

    pusherClient.connection.bind("state_change", function (states:any) {
      if(states.current === "disconnected") {
        pusherClient.connect();
      }
    });

    channel.bind("evt", (data:any) => {
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
    <Box sx={{ width: "100%" }}>
      <ChatList selfuid={user.uid} users={oppos} setCid={setCid} setOppo={setOppo} oppouid={oppouid} setOppouid={setOppouid}/>
    </Box>
  );
};
