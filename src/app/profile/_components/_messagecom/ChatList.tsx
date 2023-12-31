"use client"

import { useEffect } from "react";
import { Box, Divider, List, ListItem, ListItemButton,
  ListItemIcon, ListItemText, Typography } from "@mui/material";

import axios from "axios";

function ChatListUnit(props: any) {
  const {user, setCid, setOppo, setOppouid, selectuser } = props;

  function handler () {
    setCid(user.cid);
    setOppo(user.name);

    axios.post("/api/msg/euser", {account: user.name}).then((res)=>{
      if (res.data.message === "e") {
        // user exist
        const quid = res.data.uid;
        const qacc = res.data.account;
        console.log(quid);
        setOppouid(res.data.uid);

      } else if (res.data.message === "n") {
        alert("no such user.");
      }
    }).catch((e)=>{
      console.error(e);
    })
  }

  return (
    <>
    <Divider />
    <ListItem disablePadding>
    <ListItemButton
      selected={selectuser === user.name} onClick={handler}>
      <ListItemIcon>
      <Box
          component="img"
          sx={{
            height: 50,
            width: 50,
            border: "1px solid",
            borderRadius: "50%"
          }}
          alt="UImg"
          src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
      />
      </ListItemIcon>
      <ListItemText primary={user.name} secondary={user.last_message===""?"New Chat!":user.last_message} />
    </ListItemButton>
    </ListItem>
    </>
  )
}

function ChatList(props: any) {
  const { selfuid, users, setCid, setOppo, setOppouid, oppouid, seluser } = props;
  console.log(users);
  console.log(users?.sort((a:any, b:any) => { return b.timestamp - a.timestamp }));

  useEffect(()=>{
    if(users) {
      setOppo(users[0]?.name);
      setCid(users[0]?.cid);
    }
  }, [users])

  return (
    <List>
    <ListItem>
      <Typography variant="h5">聊天室</Typography>
    </ListItem>
      {users?.map((user:any, index:number) => (
        <ChatListUnit key={index} selectuser={seluser} selfuid={selfuid} user={user} setCid={setCid} setOppo={setOppo} oppouid={oppouid} setOppouid={setOppouid} />
      ))}
    <Divider />
    </List>
  );
}

export default ChatList;
