"use client"

import { useState } from "react";
import { Box, Button, CssBaseline, Divider, Input, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { main_theme } from "@/lib/themes";

import axios from "axios";

export default function TransactionCreat(props: any) {
  const { actionUser, trigger } = props;

  const [tacc, setTacc] = useState("");
  const [amount, setAmount] = useState("");

  function handleSubmit() {
    const payload = {
      tacc: tacc,
      amount: amount,
    }

    axios.post("/api/transferCoin", payload).then(()=>{
      alert("轉帳成功!");
      trigger();
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