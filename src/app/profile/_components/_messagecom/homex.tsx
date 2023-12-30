import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import ChatView from './ChatView'
import { Box, Divider, Grid } from '@mui/material';

export default function HomeAA(props: any) {
  const { username, trigger } = props;

  const [user, setUser] = useState({account:"", uid:""})
  const [cid, setCid] = useState("");
  const [oppo, setOppo] = useState("");
  const [oppouid, setOppouid] = useState("");
  
  useEffect(()=>{
    if(username && username !== "") {
      axios.post("/api/msg/user", {test: "test", account: username}).then((res)=>{
        let iuser = JSON.parse(res.data.message);
        setUser(iuser);
      }).catch((e)=>console.error(e));
    }
  }, [ username ]);
  
  return (
    <Grid container height="100%">
      <Grid item md={4}>
        <Sidebar user={user} setCid={setCid} oppo={oppo}
          setOppo={setOppo} oppouid={oppouid} setOppouid={setOppouid}/>
      </Grid>
      <Divider orientation="vertical"/>
      <Grid item md={7}>
        <ChatView user={user} cid={cid} oppo={oppo} oppouid={oppouid} trigger={trigger}/>
      </Grid>
    </Grid>
  )
}