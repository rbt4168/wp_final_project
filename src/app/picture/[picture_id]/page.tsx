"use client"

import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

import { Box, CssBaseline, Divider, Grid,
  IconButton, List, Paper, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';

import GlobalChip from "@/components/chipglobal";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { StyledRating } from "@/components/styledcomps";
import { CreatorListItem } from "@/components/creatorcomponent";
import { RelatedWorkListItem } from "@/components/workcomponent";

import { main_theme } from "@/lib/themes";

import axios from "axios"
import { PICTURE_SERVER_URL } from "@/lib/utils";

export default function PictureFull(props: any) {
  const { params } = props;
  const { picture_id } = params;
  const router = useRouter();

  const [disable, setDisable] = useState(false);
  const [ picdata, setPicdata ] = useState({
    url: "",
    name: "untitled",
    liked_count: 0,
    pic_id: 0,
    tags: [],
    recommand_point: 0,
    description: "",
    post_date: "",
    author_id: 0,
    origin_url: "",
  });

  const [currentUser, setCurrentUser] = useState({
    liked_picture: []
  });
  
  const [onliked, setonliked] = useState(false);
  const [ relatedArr, setRelatedArr ] = useState([0,0,0,0,0]);


  useEffect(()=> {
    console.log(currentUser?.liked_picture, picture_id);
    const pic_int = parseInt(picture_id);
    setonliked(currentUser?.liked_picture?.includes(pic_int as never));
  }, [currentUser])

  useEffect(()=>{
    const payload = {
      pic_id: Number(picture_id),
    }

    axios.post('/api/getOriginalPicture',payload).then((e)=>{
      setPicdata(e.data.picture[0]);
    }).catch((e) => {
      console.error(e);
      router.push('https://http.cat/404');
    });
  
    axios.get('/api/getNowUser').then((e)=>{
      setCurrentUser(e.data.user[0]);
    }).catch((e)=>console.error(e));
    axios.post('/api/relatedWorks',payload).then((e)=>{
      setRelatedArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));
  }, [])

  function handleLikedStatus() {
    setDisable(true);
    const payload = {
      pic_id: picture_id,
      like: !onliked,
    }

    axios.post('/api/likePicture',payload).then((e)=>{
      setPicdata(e.data.updatedPicture);
      setCurrentUser(e.data.updatedUser);
    }).catch((e)=>console.error(e)).finally(()=>(setDisable(false)));
  }

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
              src={PICTURE_SERVER_URL + (picdata.origin_url? picdata.origin_url:"")}
          />

          <Box display="flex" justifyContent="space-between" >
            <Typography display="flex" justifyContent="left" alignItems="center"
            component="h2" variant="h4" color="inherit" gutterBottom mt={3}
            sx={{ maxWidth: "80%", overflow:"hidden" }}>
              {picdata.name?picdata.name:"untitled"}
            </Typography>

            <Box display="flex" alignItems="center">
              <IconButton aria-label="fingerprint" color="secondary" onClick={handleLikedStatus} disabled={disable}>
                {picdata.liked_count?picdata.liked_count:0}{onliked?(<FavoriteIcon sx={{ width: "3rem", height: "3rem" }}/>):(<FavoriteBorderIcon  sx={{ width: "3rem", height: "3rem" }}/>) }
              </IconButton>
              <IconButton aria-label="fingerprintx" color="primary" onClick={()=>{
                navigator.clipboard.writeText(window.location.href);
              }}>
                <ShareIcon color="primary" sx={{ width: "3rem", height: "3rem" }}/>
              </IconButton>
            </Box>
          </Box>

          <Box display="flex" justifyContent="space-between" >
            <Typography color="inherit" gutterBottom>
              ID:{picdata.pic_id?picdata.pic_id:0}
            </Typography>

            <Typography display="flex" justifyContent="left" alignItems="center">
              {picdata.post_date?picdata.post_date:""}
            </Typography>
          </Box>

          <Divider textAlign="left">Tags</Divider>

          <List>
            {picdata.tags?.map((e:any, id:number)=>(<GlobalChip key={id} text={e}/>))}
          </List>

          <Box mt={1}></Box>
          <Divider textAlign="left">Recommand</Divider>
          <Box mt={1}></Box>
          <StyledRating
            name="customized-color"
            readOnly
            value={picdata.recommand_point?picdata.recommand_point:0}
            max={10}
            getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
            icon={<FavoriteIcon fontSize="inherit" />}
            emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          />

          <Box mt={1}></Box>
          <Divider textAlign="left">Creator</Divider>
          <List>
            <CreatorListItem user_id={picdata.author_id?picdata.author_id:0}/>
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
                Inspiration
              </Typography>
              <Divider>What&apos;s Next</Divider>
              <List>
                {relatedArr.map((e:any, id:any)=>{
                  return(<RelatedWorkListItem key={id} pic_id={e}/>)
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