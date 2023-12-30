import { Button, Dialog, DialogActions, DialogContent, 
  DialogContentText, DialogTitle, Grid, Input, TextField } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";

export default function InputStable( props: any ) {
  const {user, cid, oppouid, oppo} = props;

  const [text, setText] = useState("");
  const [dval, setDval] = useState(0);


  const handleSend = async () => {
    console.log(cid, oppouid);
    axios.post("/api/msg/message", {uid: user.uid, cid: cid, content: text, oppo: oppouid}).then((res)=>{
      console.log(res);
      setText("");
    })
  };

  function handleDonate() {
    let payload = {
      tacc: oppo,
      amount: dval,
    }

    axios.post("/api/transferCoin", payload).then((e)=>{
      console.log(e);
      axios.post("/api/msg/message", {uid: user.uid, cid: cid, content: "已轉帳: "+e.data.newTx.amount, oppo: oppouid}).then((res)=>{
        console.log(res);
        setText("");
        setOpendia(false);
      })
    }).catch((e)=>console.error(e));
  }

  const [opendia, setOpendia] = useState(false);

  const handleKeyPress = (event: any) => {
    if(event.key === 'Enter'){
      console.log('enter press here! ');
      console.log(cid, oppouid);
      if( text !== "" ) {
        axios.post("/api/msg/message", {uid: user.uid, cid: cid, content: text, oppo: oppouid}).then((res)=>{
          console.log(res);
          setText("");
        })
      }
    }
  }

  return (
    <>
    <Grid container sx={{ width: "100%"}}>
      <Grid item md={8}>
        <Input
          type="text"
          placeholder="Type something..."
          value={text}
          onChange={(e:any)=>setText(e.target.value)}
          onKeyDown={handleKeyPress}
          style={{ fontSize: 20 , width: "90%" }}
        />
      </Grid>
      <Grid item md={2}>
        <Button onClick={handleSend} component="label" variant="contained">
          Send
        </Button>
      </Grid>
      
      <Grid item md={2}>
        <Button onClick={()=>setOpendia(true)} color="secondary" component="label" variant="contained">
          Donate
        </Button>
      </Grid>
    </Grid>
    <Dialog open={opendia} onClose={()=>{}}>
        <DialogTitle>Donate</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Confirm donat to {oppo} ?
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="amount"
            type="email"
            fullWidth
            variant="standard"
            value={dval}
            onChange={(e:any)=>setDval(parseInt(e.target.value) || 0)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>setOpendia(false)}>Cancel</Button>
          <Button onClick={handleDonate}>Donate</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
