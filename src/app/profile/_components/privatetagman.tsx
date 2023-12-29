"use client"

import { useEffect, useState } from "react";
import { Box, CssBaseline, Divider,
    Typography, List, ListItem, ListItemButton, Input, Button} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import GlobalChip from "@/components/chipglobal";

import { main_theme } from "@/lib/themes"

import axios from "axios";

function PrivateTagListItem(props: any) {
    const {item, price, username, ikey, setsel, disabled} = props;
    return(
      <>
        <ListItem disablePadding>
        <ListItemButton onClick={()=>setsel(ikey)} disabled={disabled}>
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
  const { actionUser, trigger } = props;

  const [ tags, setTags ] = useState(["level-1", "level-2", "level-3", "level-4"]);
  const [ priArr, setPriArr ] = useState([50, 100, 150, 300]);

  const [selid, setSelid] = useState(0);
  const [disabled, setDisabled] = useState(false);
  function handleSubmit() {
    setDisabled(true);
    const payload = {
      tags: tags,
      prices: priArr,
    }

    axios.post("/api/savePrivateTags", payload).then(()=>{
      alert("修改成功!");
      trigger();
    }).catch((e)=>console.error(e)).finally(()=>{
      setDisabled(false);
    });
  }

  useEffect(()=>{
    if(actionUser.private_tags) {
      setTags(actionUser.private_tags);
    }
    if(actionUser.private_tags_cost) {
      setPriArr(actionUser.private_tags_cost);
    }
  }, [actionUser])

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
          disabled={disabled}
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
          disabled={disabled}
          color="primary"
          sx={{width: "60%"}}
          value={priArr[selid]}
          onChange={(e:any)=>{setPriArr(priArr.map((e0:any,id:any)=>{
            if(id === selid) {
              const q = parseInt(e.target.value);
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
              <PrivateTagListItem setsel={setSelid} key={index}
                ikey={index} item={e} price={priArr[index]}
                username={actionUser.username}  disabled={disabled}
              />
            ))}
          </List>
        </Box>
      </Box>

      <Box mx={5} my={3}>
        <Button component="label" variant="outlined" onClick={handleSubmit} disabled={disabled}
          sx={{width: "60%"}}>
          儲存 Save
        </Button>
      </Box>
    </ThemeProvider>
  )
}