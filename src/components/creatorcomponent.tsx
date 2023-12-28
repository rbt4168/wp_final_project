import { Box, Grid, ListItem, ListItemButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

async function creatorFetchHandler(user_id: any) {
  try {
    let response = await axios.get("/api/getAuthorById?user_id="+user_id);
    console.log(response.data)
    return response.data;
  } catch (e) {
    console.error(e);
    return {};
  }
}

export function CreatorListItem(props: any) {
    const { user_id } = props;
    
    const [ authorData, setAuthouData ] = useState({
      account: "",
      name:"",
      quote:"",
      bio: "",
      links: "",
      works: []
    });

    useEffect(()=>{
      creatorFetchHandler(user_id).then((e)=>{
        e?setAuthouData(e):0;
      });
    }, [user_id]);
    

    return (
      <ListItem disablePadding>
      <ListItemButton onClick={()=>{}}>
      <Grid container spacing={2}>
        <Grid item>
          <Box
              component="img"
              sx={{
                height: 128,
                width: 128,
                border: "1px solid",
                borderRadius: "30px"
              }}
              alt="a"
              src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div" color="primary">
                {authorData.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {authorData.quote}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                account: {authorData.account}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </ListItemButton>
      </ListItem>
    );
  }