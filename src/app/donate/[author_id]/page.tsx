"use client"

import { useEffect, useState } from "react";
import { Box, Button, CssBaseline, Dialog, DialogActions,
  DialogContent, DialogContentText, DialogTitle, Divider,
  Grid, List, ListItem, ListItemButton, Typography } from "@mui/material";
  import { ThemeProvider } from '@mui/material/styles';

import GlobalChip from "@/components/chipglobal";
import CreatorHeader from "@/components/creatorheader";
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";

import { main_theme } from "@/lib/themes";

import axios from "axios";

interface list_prop_interface {
  text: string
  cost: number
  author: string
}
function CostListItem(props: list_prop_interface) {
  const {text, cost, author} = props;

  const [open, setOpen] = useState(false);

  function handleAgree() {
    setOpen(false);

    const payload = {
      tagname: text,
      authorname: author, 
    }

    axios.post("/api/buyTag", payload)
      .then(()=>{
        alert("購買成功!");
      })
      .catch((e)=>console.error(e))
      .finally(()=>setOpen(false));
  }

  return(
    <>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={()=>setOpen(true)}>
          <Box display="flex" justifyContent="space-between" sx={{width: "100%"}}>
            <GlobalChip text={"private-"+author+"-"+text}/>
            <Typography color="inherit">
              {cost.toString() + " Coins"}
            </Typography>
          </Box>
        </ListItemButton>

        <Dialog
          open={open}
          onClose={()=>setOpen(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Buy this Tag <GlobalChip text={"private-"+author+"-"+text}/>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Transfer {cost} coins to the creator.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={()=>setOpen(false)}>No</Button>
            <Button onClick={handleAgree} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </ListItem>
    </>
  )
}

interface prop_interface {
  params : {
    author_id: number
  }
}

export default function DonatePage(props: prop_interface) {
  const { params } = props;
  const { author_id } = params;
  
  const [ activeAuthor, setActiveAuthor ] = useState({
    account: "",
    name: "",
    quote: "",
    bio: "",
    links: "",
    works: [],
    tags: [],
    costs: [],
  })

  useEffect(()=>{
    axios.get("/api/getAuthorById?user_id="+author_id).then((e)=>{
      console.log(e.data);
      setActiveAuthor(e.data);
    }).catch((e)=>console.error(e));
  }, [author_id])

  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <NavigationBar/>

      <CreatorHeader activeAuthor={activeAuthor} setActiveAuthor={setActiveAuthor} authorId={author_id}/>
      
      <DivLineCenter text="Private Tags"/>
      <Grid
        mt={3}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={7} md={7}>
          <List >
            {activeAuthor.tags?.map((e:any, id:number)=>(
              <CostListItem key={id} author={activeAuthor.account}
                text={e} cost={activeAuthor.costs[id]}
              />
            ))}
            <Divider />
          </List>
        </Grid>
      </Grid>

      <FooterComponent/>
    </ThemeProvider>
  )
}