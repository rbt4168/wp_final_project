"use client"

import FooterComponent from "@/components/footer"
import NavigationBar from "@/components/navbar"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, Grid, IconButton, List, Paper, ThemeProvider, Typography } from "@mui/material"

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useEffect, useState } from "react";
import GlobalChip from "@/components/chipglobal"
import { StyledRating } from "@/components/styledcomps"
import { CreatorListItem } from "@/components/creatorcomponent"
import { RelatedWorkListItem } from "@/components/workcomponent"

import axios from "axios"

export default function PictureFull(props: any) {
  const { params } = props;
  const { picture_id } = params;

  const [ picdata, setPicdata ] = useState({
    url: "",
    name: "untitled",
    liked_count: 0,
    pic_id: 0,
    tags: [],
    recommand_point: 0,
    description: ""
  });

  useEffect(()=>{
    let payload = {
      pic_id: picture_id,
    }

    axios.post('/api/getPicture',payload).then((e)=>{
      setPicdata(e.data.picture[0]);
      // console.log(e.data.picture[0]);
    }).catch((e)=>console.error(e));

  }, [])
  
  const [onliked, setonliked] = useState(true);
  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <NavigationBar/>
      <Grid container mt={3}>
        <Grid item xs={1}>

        </Grid>
        <Grid item xs={7}>
          <Box
              component="img"
              sx={{
                width: "100%"
              }}
              alt="The Creation."
              src={picdata.url? picdata.url:""}
          />
          <Box display="flex" justifyContent="space-between" >
            <Typography display="flex" justifyContent="left" alignItems="center"
            component="h2" variant="h4" color="inherit" gutterBottom mt={3}>
              {picdata.name?picdata.name:"untitled"}
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton aria-label="fingerprint" color="secondary" onClick={()=>setonliked(!onliked)}>
                {picdata.liked_count?picdata.liked_count:0}{onliked?(<FavoriteIcon  sx={{ width: "3rem", height: "3rem" }}/>):(<FavoriteBorderIcon  sx={{ width: "3rem", height: "3rem" }}/>) }
              </IconButton>
              <ShareIcon color="primary" sx={{ width: "3rem", height: "3rem" }}/>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" >
            <Typography color="inherit" gutterBottom>
              ID:{picdata.pic_id?picdata.pic_id:0}
            </Typography>
            <Typography display="flex" justifyContent="left" alignItems="center">
              2022-05-08
            </Typography>
          </Box>
          <Divider textAlign="left">Tags</Divider>
          <List>
            {picdata.tags?.map((e:any, id:any)=>(<GlobalChip text={e}/>))}
          </List>
          <Box mt={1}></Box>
          <Divider textAlign="left">Recommand</Divider>
          <Box mt={1}></Box>
          <StyledRating
            name="customized-color"
            readOnly
            defaultValue={picdata.recommand_point?picdata.recommand_point:0}
            max={10}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />
          <Box mt={1}></Box>
          <Divider textAlign="left">Creator</Divider>
          <List>
            <CreatorListItem user_id={0}/>
          </List>
          <Divider textAlign="left">Origin</Divider>
          <Box mt={1}></Box>
          <Paper elevation={0} sx={{ p: 2, bgcolor: main_theme.palette.info.main }}>
            <Typography>
              {picdata.description?picdata.description:""}
            </Typography >
          </Paper>
          <Box mt={1}></Box>
          <Divider textAlign="left">Comments</Divider>
          <Box mt={1}></Box>
          <Paper elevation={0} sx={{ p: 2, bgcolor: "grey.200" }}>
            <Typography>
              No Comments Now.
            </Typography >
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={1}>
            </Grid>
            <Grid item xs={10}>
              <Typography display="flex" justifyContent="left" alignItems="center"
                component="h2" variant="h4" color="inherit" gutterBottom mt={3}>
                Related Works
              </Typography>
              <Divider>What's Next</Divider>
              <List>
                {[1,1,1,1,1].map((e:any, id:any)=>{
                  return(<RelatedWorkListItem pic_id={0}/>)
                })}
              </List>
            </Grid>
            <Grid item xs={0}>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FooterComponent/>
    </ThemeProvider>
  )
}