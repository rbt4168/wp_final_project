"use client"
import GlobalChip from "@/components/chipglobal";
import CreatorHeader from "@/components/creatorheader";
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";
import { Box, Button, CssBaseline, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Grid, List, ListItem, ListItemButton, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

function CostListItem(props: any) {
  const {text, cost, author} = props;
  const [open, setOpen] = useState(false);

  const handleAgree = () => {
    setOpen(false);
    let payload = {
      tagname: text,
      authorname: author, 
    }
    // complete buying action
    axios.post("/api/buyTag", payload).then((e)=>{
      // console.log(e);
      alert("購買成功!");
    }).catch((e)=>console.error(e));
  };

  return(
    <>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton onClick={()=>setOpen(true)}>
          <Box display="flex" justifyContent="space-between" sx={{width: "100%"}}>
            <GlobalChip text={"private-"+author+"-"+text}/>
            <Typography color="inherit">
              {cost+" Coins"}
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

export default function DonatePage(props: any) {
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
  }, [])

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
            {activeAuthor.tags?.map((e:any, id:any)=>(<CostListItem author={activeAuthor.account} text={e} cost={activeAuthor.costs[id]}/>))}
            <Divider />
          </List>
        </Grid>
      </Grid>

      <FooterComponent/>
    </ThemeProvider>
  )
}