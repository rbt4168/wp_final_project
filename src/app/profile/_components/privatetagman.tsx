"use client"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, ThemeProvider,
    Typography, List, ListItem, ListItemButton, Input, Button} from "@mui/material"
import { useEffect, useState } from "react";
import GlobalChip from "@/components/chipglobal";
import { QueryBuilder } from "drizzle-orm/sqlite-core";
import { Quicksand } from "next/font/google";
import axios from "axios";

function TxListItem(props: any) {
    const {item, price, username, ikey, setsel} = props;
    return(
      <>
      <ListItem disablePadding>
      <ListItemButton onClick={()=>setsel(ikey)}>
        <Box display="flex" justifyContent="space-between" sx={{ width: "100%" }}>
          <Box>Tag: <Typography><GlobalChip text={"private-"+username+"-"+item}/></Typography></Box>
          <Box>Price: <Typography variant="h6" color="grey.600">{price}</Typography></Box>
        </Box>
      </ListItemButton>
      </ListItem>
      <Divider />
      </>
    )
}

export default function PrivTagManange(props: any) {
  const { setModifyID, setSelectName, actionUser } = props;

  const [ tags, setTags ] = useState(["level-1", "level-2", "level-3", "level-4"]);
  const [ priArr, setPriArr ] = useState([50, 100, 150, 300]);

  const [selid, setSelid] = useState(0);

  function handleSubmit() {
    console.log(actionUser);
    let payload = {
      tags: tags,
      prices: priArr,
    }

    axios.post("/api/savePrivateTags", payload).then((e)=>{
      console.log(e.data);
    }).catch((e)=>console.error(e));
  }

  useEffect(()=>{
    if(actionUser.private_tags) {
      setTags(actionUser.private_tags);
    }
    if(actionUser.private_tags_cost) {
      setPriArr(actionUser.private_tags_cost);
    }
  }, [])

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        標籤管理 Private Tags
      </Typography>
      <Divider />
      
      <Box mx={5} my={3}>
        <Typography>選擇標籤 Tag</Typography>
        <GlobalChip text={"private-"+actionUser.username+"-"+tags[selid]}/>
      </Box>

      <Box mx={5} my={3}>
        <Typography>標籤名稱 Name</Typography>
        <Input
          id="title"
          placeholder="title"
          color="primary"
          sx={{width: "60%"}}
          value={tags[selid]}
          onChange={(e:any)=>{setTags(tags.map((e0:any,id:any)=>{
            if(id === selid) {
              return e.target.value;
            } else return e0;
          }))}}
        />
      </Box>

      <Box mx={5} my={3}>
        <Typography>標籤價格 Price</Typography>
        <Input
          id="title"
          placeholder="title"
          color="primary"
          sx={{width: "60%"}}
          value={priArr[selid]}
          onChange={(e:any)=>{setPriArr(priArr.map((e0:any,id:any)=>{
            if(id === selid) {
              let q = parseInt(e.target.value);
              if(Number.isNaN(q))
                return 0;
              else return q;
            } else return e0;
          }))}}
        />
      </Box>
      
      <Box mx={5} my={3}>
        <Box sx={{ width: "60%" }}>
          <List>
            <Divider />
            {tags.map((e: any, index:any) => (
              <TxListItem setsel={setSelid} key={index} ikey={index} item={e} price={priArr[index]} username={actionUser.username}/>
            ))}
          </List>
        </Box>
      </Box>
      

      <Box mx={5} my={3}>
        <Button component="label" variant="outlined" onClick={handleSubmit}
          sx={{width: "60%"}}>
          儲存 Save
        </Button>
      </Box>
    </ThemeProvider>
  )
}