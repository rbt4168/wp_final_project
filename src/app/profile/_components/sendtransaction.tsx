import { main_theme } from "@/lib/themes";
import { Box, Button, CssBaseline, Divider, Input, List, ListItem, ListItemButton, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";

import { useState } from "react";

export default function TransactionCreat(props: any) {
  const { actionUser, trigger } = props;

  const [tacc, setTacc] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: any) => {
    // TODO: Update User Profile
    let payload = {
      tacc: tacc,
      amount: amount,
    }
    axios.post("/api/transferCoin", payload).then((e)=>{
      console.log(e);
      trigger();
      alert("轉帳成功!");
    }).catch((e)=>alert(e.response.data));
  };

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        轉帳 Transfer
      </Typography>
        
      <Divider />

      <Box mx={5} my={3}>
        <Box display="flex" justifyContent="space-between" sx={{ width: "60%" }}>
          <Box>account: <Typography variant="h6" color="primary">{actionUser.username}</Typography></Box>
          <Box>balance: <Typography variant="h6" color="error">{actionUser.coins}</Typography></Box>
        </Box>
      </Box>

      <Box mx={5} my={3}>
        <Typography>帳號 Account</Typography>
        <Input
          id="title"
          placeholder="account"
          color="primary"
          sx={{width: "60%"}}
          value={tacc}
          onChange={(e:any)=>setTacc(e.target.value)}
        />
      </Box>

      
      <Box mx={5} my={3}>
        <Typography>金額 Amount</Typography>
        <Input
          id="title"
          placeholder="100"
          color="primary"
          sx={{width: "60%"}}
          value={amount}
          onChange={(e:any)=>setAmount(e.target.value)}
        />
      </Box>

      <Box mx={5} my={3}>
        <Button component="label" variant="outlined" onClick={handleSubmit}
          sx={{width: "60%"}}>
          送出轉帳 Transfer
        </Button>
      </Box>
      
        
    </ThemeProvider>
  );
}