"use client"

import { useEffect, useState } from "react";
import { Box, Button, Dialog, DialogTitle, Divider, List,
  ListItem, ListItemButton, Typography } from "@mui/material";

import CampaignIcon from '@mui/icons-material/Campaign';

import Message from "./Message";

import { publicEnv } from "@/lib/env/public";

import axios from "axios";
import PusherClient from "pusher-js";

const pusherClient = new PusherClient( publicEnv.NEXT_PUBLIC_PUSHER_KEY, {
  cluster: publicEnv.NEXT_PUBLIC_PUSHER_CLUSTER,
  forceTLS: true,
});

function Messages(props: any) {
  const { cid, uid } = props;

  const [ msgs, setMsgs ] = useState([]);
  const [opendia, setOpendia] = useState(false);
  const [diaid, setDiaid] = useState("");
  const [isself, setIsself] = useState("");

  useEffect(()=>{
    axios.post("/api/msg/gmsg", {cid: cid}).then((res)=>{
      setMsgs(JSON.parse(res.data.message));
    }).catch((e)=>console.error(e));

    const channel = pusherClient.subscribe(`ch_${cid}`);

    pusherClient.connection.bind("state_change", function (states: any) {
      if(states.current === "disconnected") {
        pusherClient.connect();
      }
    });

    channel.bind("evt", (data:any) => {
      console.log(data);
      axios.post("/api/msg/gmsg", {cid: cid}).then((res)=>{
        setMsgs(JSON.parse(res.data.message));
      }).catch((e)=>console.error(e));
    });

    return ()=>{
      pusherClient.unsubscribe(`ch_${cid}`);
    }
  }, [ cid, uid ]);
  
  function open_dialog(id: any, iss: any) {
    console.log(id);
    setDiaid(id);
    setOpendia(true);
    setIsself(iss);
  }

  function close_dialog () {
    setOpendia(false);
  }
  
  function reset_visible (val: any) {
    axios.post("/api/msg/rvis", {cid: cid, id: diaid, vis: val}).then((res)=>{
      console.log(res);
    }).catch((e)=>console.error(e));
    close_dialog();
  }

  return (
    <>
      <List sx={{ width: "100%", height: "100%"}}>
        <ListItem>
          {msgs?.map((m: any, id:number) => {
            if(m.visible === -1) {
              return (
                <Typography key={id} variant="h5" color="primary">
                  <CampaignIcon color="primary"/> {m.content}
                </Typography>
              );
            } else return (<></>);
          })}
        </ListItem>
        <Divider />
        <ListItem disablePadding sx={{ height: "90%"}}>
          <List sx={{ width: "100%", height: "100%", overflow: "scroll"}}>
            <Box mt={1}></Box>
            {msgs?.map((m: any,id:number) => (
              <ListItem key={id} disablePadding>
              <ListItemButton>
                <Message message={m} key={m.id} uid={uid} opendia={open_dialog} />
              </ListItemButton>
              </ListItem>
            ))}
          </List>
        </ListItem>
      </List>
      
      <Dialog open={opendia}>
        <DialogTitle>編輯訊息(id:{diaid})</DialogTitle>
        {isself ? (
          <>
            <Button onClick={() => reset_visible(1)}>對自己隱藏</Button>
            <Button onClick={() => reset_visible(0)}>對所有人收回</Button>
          </>
        ) : null}
        <Button onClick={() => reset_visible(-1)}>設為公告</Button>
        <Button onClick={close_dialog}>Close</Button>
      </Dialog>
  </>
  );
}

export default Messages;
