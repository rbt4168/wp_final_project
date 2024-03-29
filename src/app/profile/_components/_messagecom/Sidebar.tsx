"use client"

import {useEffect, useState} from "react";
import { Box } from "@mui/material";

import ChatList from "./ChatList";

import { publicEnv } from "@/lib/env/public";

import axios from "axios";
import PusherClient from "pusher-js";


const pusherClient = new PusherClient(publicEnv.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
  forceTLS: true,
});

export default function Sidebar(props:any) {
  const {user, setCid, setOppo, oppo, oppouid, setOppouid} = props;
  const [oppos, setOppos] = useState([]);

  useEffect(()=>{
    axios.post("/api/msg/chats", {uid: user.uid}).then((res)=>{
      const iuser = JSON.parse(res.data.message);
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
        const iuser = JSON.parse(res.data.message);
        console.log(iuser);
        setOppos(iuser);
      }).catch((e)=>console.error(e));
    });

    return ()=>{
      pusherClient.unsubscribe(`ch_${user.uid}`);
    }
  }, [ user ])

  return (
    <Box sx={{ width: "100%" }}>
      <ChatList selfuid={user.uid} users={oppos} seluser={oppo} setCid={setCid} setOppo={setOppo} oppouid={oppouid} setOppouid={setOppouid}/>
    </Box>
  );
};
