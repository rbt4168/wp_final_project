"use client"
import { Box, Card, CardActionArea, CardMedia, Divider, Grid, ListItem, ListItemButton, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { StyledRating } from "./styledcomps";
import { PICTURE_SERVER_URL } from "@/lib/utils";
import GlobalChip, { GlobalChipSmall } from "./chipglobal";
import DivLineCenter, { DivLineCenterNoMt } from "./divline";

async function creatorFetchHandler(user_id: any) {
  try {
    const response = await axios.get("/api/getAuthorById?user_id="+user_id);
    // console.log(response.data)
    return response.data;
  } catch (e) {
    console.error(e);
    return {};
  }
}

async function workFetchHandler(pic_id: any) {
  try {
    const payload = {
      pic_id: pic_id,
    }
    const response = await axios.post("/api/getPicture", payload);
    // console.log(response.data.picture[0])
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
    author_id: 0,
  });

  const [ author, setAuthor ] = useState("")

  useEffect(()=>{
    workFetchHandler(pic_id).then((e)=>{
      if(e){
        setPicdata(e);
        creatorFetchHandler(e.author_id).then((e2)=>{
          setAuthor(e2.name);
        })
      }
      
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
            alt="Related Work."
            src={PICTURE_SERVER_URL + (picdata.url?picdata.url:"")}
        />
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h5" component="div">
              {picdata.name?picdata.name:"untitled"}
            </Typography>
            <Typography gutterBottom variant="body2" component="div" color="primary">
              {author}
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
    tag:[],
    liked_count: 0,
  });

  useEffect(()=>{
    workFetchHandler(pic_id).then((e)=>{
      e?setPicdata(e):0;
    });
  }, [pic_id]);

  return (
    <Box m={2}>
      <Card sx={{ maxWidth: "100%" , marginBottom: 1}} >
        <CardActionArea href={"/picture/"+pic_id}>
          <CardMedia
            component="img"
            image={PICTURE_SERVER_URL + (picdata.url?picdata.url:"")}
          />
        </CardActionArea>
      </Card>
      {/* <Typography>{picdata.name}</Typography> */}
      {picdata.tags?.map((e:any, id:number)=>(<GlobalChipSmall key={id} text={e}/>))}
      <Box display="flex" justifyContent="space-between">

        <Typography fontSize="15px" sx={{ width: "70%", overflow: "hidden" }}>{picdata.name}</Typography>
        <Typography variant="body2" gutterBottom>
                {picdata.liked_count} <FavoriteIcon color="secondary" />
              </Typography>
            
      </Box>
      <Divider textAlign="right" sx={{fontSize: "12px"}}>{picdata.post_date}</Divider>
    </Box>
  );
}

export function ArtWorkListItem(props: any) {
  const { pic_id, setid, redir } = props;

  const [ picdata, setPicdata ] = useState({
    url:"",
    name:"untitled",
    post_date: "",
    recommand_point: 0,
    liked_count: 0,
    tags: []
  });

  useEffect(()=>{
    workFetchHandler(pic_id).then((e)=>{
      e?setPicdata(e):0;
    });
  }, [pic_id]);

  return (
    <ListItem disablePadding>
    <ListItemButton onClick={()=>{ setid(pic_id); redir("修改作品");}}>
      <Grid container spacing={2}>
        <Grid item>
          <Box
              component="img"
              sx={{
                height: 128,
                width: 128,
              }}
              alt="a"
              src={PICTURE_SERVER_URL + (picdata.url?picdata.url:"")}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                {picdata.name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                ID: {pic_id}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {picdata.liked_count} <FavoriteIcon color="secondary" />
              </Typography>
              {picdata.tags?.map((e:any, id:number)=>(<GlobalChipSmall key={id} text={e}/>))}
              <Typography variant="body2" color="text.secondary">
                <StyledRating
                  name="customized-color"
                  readOnly
                  defaultValue={10}
                  value={picdata.recommand_point}
                  max={10}
                  getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItemButton>
    </ListItem>
  );
}