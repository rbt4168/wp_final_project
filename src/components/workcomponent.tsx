"use client"
import { Box, Card, CardActionArea, CardMedia, Grid, ListItem, ListItemButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

async function workFetchHandler(pic_id: any) {
  try {
    let payload = {
      pic_id: pic_id,
    }
    let response = await axios.post("/api/getPicture", payload);
    console.log(response.data.picture[0])
    return response.data.picture[0];
  } catch (e) {
    console.error(e);
    return {};
  }
}

export function RelatedWorkListItem(props: any) {
    const { pic_id } = props;

    const [ picdata, setPicdata ] = useState({
      url:"",
      name:"untitled",
      post_date: "",
    });

    useEffect(()=>{
      workFetchHandler(pic_id).then((e)=>{
        e?setPicdata(e):0;
      });
    }, [pic_id]);

    return (
      <ListItem disablePadding>
      <ListItemButton href={"/picture/"+pic_id}>
      <Grid container spacing={2}>
        <Grid item>
          <Box
              component="img"
              sx={{
                height: 128,
                width: 128,
              }}
              alt="a"
              src={picdata.url?picdata.url:""}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                {picdata.name?picdata.name:"untitled"}
              </Typography>
              <Typography gutterBottom variant="body2" component="div" color="primary">
                作者
              </Typography>
              <Typography variant="body2" gutterBottom>
                ID: {pic_id}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {picdata.post_date}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </ListItemButton>
      </ListItem>
    );
  }

export function WorkCardComponent(props: any) {
    const { pic_id } = props;

    const [ picdata, setPicdata ] = useState({
      url:"",
      name:"untitled",
      post_date: "",
    });

    useEffect(()=>{
      workFetchHandler(pic_id).then((e)=>{
        e?setPicdata(e):0;
      });
    }, [pic_id]);

    return (
      <Box m={2}>
        <Card sx={{ maxWidth: "100%" }}>
          <CardActionArea href={"/picture/"+pic_id}>
            <CardMedia
              component="img"
              image={picdata.url}
            />
          </CardActionArea>
        </Card>
        <Typography>{picdata.post_date}</Typography>
      </Box>
    );
  }