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
import { default_tags } from "@/lib/utils"
import axios from "axios"
import { StyledRating } from "@/components/styledcomps"
function WorkCard(props: any) {
  const [onliked, setonliked] = useState(true);
  return (
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
              創作者嘎波
            </Typography>
            <Typography variant="body2" gutterBottom>
              好喜歡和大家玩的~~
            </Typography>
            <Typography variant="body2" color="text.secondary">
              account: cappo
            </Typography>
          </Grid>
        </Grid>
        <Grid item>
          <IconButton aria-label="fingerprint" color="secondary" onClick={()=>setonliked(!onliked)}>
            {onliked?(<FavoriteIcon />):(<FavoriteBorderIcon/>) }
          </IconButton>
        </Grid>
      </Grid>
    </Grid>
  );
}

function RelatedWorkCard(props: any) {
  return (
    <Grid container spacing={2}>
      <Grid item>
        <Box
            component="img"
            sx={{
              height: 128,
              width: 128,
              border: "1px solid",
              borderRadius: "5px"
            }}
            alt="a"
            src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
        />
      </Grid>
      <Grid item xs={12} sm container>
        <Grid item xs container direction="column" spacing={2}>
          <Grid item xs>
            <Typography gutterBottom variant="h5" component="div">
              嘎波啵啵~
            </Typography>
            <Typography gutterBottom variant="body2" component="div" color="primary">
              創作者嘎波
            </Typography>
            <Typography variant="body2" gutterBottom>
              ID: 13794058
            </Typography>
            <Typography variant="body2" color="text.secondary">
              2023-03-05
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default function PictureFull(props: any) {
  const { params } = props;
  const { picture_id } = params;

  const [ picdata, setPicdata ] = useState({});

  useEffect(()=>{
    let payload = {
      pic_id: picture_id,
    }

    axios.post('/api/getPicture',payload).then((e)=>{
      setPicdata(e.data.picture[0]);
      console.log(e.data.picture[0]);
    }).catch((e)=>console.error(e));

  }, [])

  var tag_array = default_tags;
  
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
                width: "100%",
                border: "1px solid"
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
          <Box mt={1}></Box>
          <WorkCard />
          <Box mt={1}></Box>
          <Divider textAlign="left">Origin</Divider>
          <Box mt={1}></Box>
          <Paper elevation={0} sx={{ p: 2, bgcolor: main_theme.palette.info.main }}>
            <Typography>
              {picdata.description}
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
        {/* <Grid item xs={false}>
          <Divider orientation="vertical" flexItem />
        </Grid> */}
        <Grid item xs={4}>
          <Grid container>
            <Grid item xs={1}>

            </Grid>
            <Grid item xs={8}>
              <Typography display="flex" justifyContent="left" alignItems="center"
                component="h2" variant="h4" color="inherit" gutterBottom mt={3}>
                Related Works
              </Typography>
              <Divider>What's Next</Divider>
              {tag_array.map((e:any, id:any)=>{
                return(<Box mt={3}><RelatedWorkCard/></Box>)
              })}
            </Grid>
            <Grid item xs={2}>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <FooterComponent/>
    </ThemeProvider>
  )
}