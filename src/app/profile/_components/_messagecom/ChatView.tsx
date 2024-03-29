"use client"
import { Divider, List, ListItem } from "@mui/material";

import Messages from "./Messages";
import InputStable from "./Input";

export default function ChatView ( props: any ) {
  const { user, cid, oppo, oppouid, trigger } = props;

  return (
    <List sx={{ width: "100%", height: "100%"}}>
      <ListItem sx={{ height: "80%" }} disablePadding>
        <Messages cid={cid} uid={user.uid}/>
      </ListItem>
      <Divider />
      <ListItem disablePadding>
        <InputStable user={user} cid={cid} oppo={oppo} oppouid={oppouid} trigger={trigger}/>
      </ListItem>
    </List>
  )
}