"use client"

import { useEffect, useState } from "react";
import { Box, CssBaseline, Divider, Typography,
  List, ListItem, ListItemButton} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { main_theme } from "@/lib/themes";

import axios from "axios";

function TxListItem(props: any) {
    const {item, username} = props;

    return(
      <>
        <Divider textAlign="left">{"TX:"+item.timestamp}</Divider>
        <ListItem disablePadding>
        <ListItemButton>
          <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
            <Box>From: <Typography variant="h6" color={item.from_user===username?"primary":"grey.600"}>{item.from_user}</Typography></Box>
            <Box>To: <Typography variant="h6" color={item.to_user===username?"primary":"grey.600"}>{item.to_user}</Typography></Box>
            <Box>Amount: <Typography variant="h6" color="error">{item.amount}</Typography></Box>
          </Box>
        </ListItemButton>
        </ListItem>
      </>
    )
}

export default function Transactions(props: any) {
  const { actionUser } = props;
  const [ txs, setTxs ] = useState([]);

  useEffect(()=>{
    axios.get("/api/getTx").then((e)=>{
      setTxs(e.data.txs.reverse());
    });
  }, [])

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        交易紀錄 Transactions
      </Typography>
      <Divider />

      <Box>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
            <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
              <Box>account: <Typography variant="h6" color="primary">{actionUser.username}</Typography></Box>
              <Box>balance: <Typography variant="h6" color="error">{actionUser.coins}</Typography></Box>
            </Box>
            </ListItemButton>
          </ListItem>

          <Divider />
          {txs.map((e: any, index:any) => (
            <TxListItem key={index} item={e} username={actionUser.username}/>
          ))}
          <Divider />
          
        </List>
      </Box>
    </ThemeProvider>
  )
}