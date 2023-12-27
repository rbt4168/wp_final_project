"use client"

import FooterComponent from "@/components/footer"
import NavigationBar from "@/components/navbar"
import { main_theme } from "@/lib/themes"
import { Box, Chip, CssBaseline, Divider, Grid, IconButton, List, Paper, ThemeProvider, Typography } from "@mui/material"

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { useState } from "react";
import GlobalChip from "@/components/chipglobal"
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

  var tag_array = ["Happy", "Sad", "Angry", "Excited", "Anxious", "Relaxed", "Confident", "Nervous", "Playful", "Thoughtful", "Content", "Bored", "Energetic", "Tired", "Curious", "Surprised", "Motivated", "Inspired", "Grateful", "Hopeful", "Enthusiastic", "Pensive", "Reflective", "Inquisitive", "Amused", "Disappointed", "Overwhelmed", "Peaceful", "Irritated", "Proud", "Guilty", "Jealous", "Apathetic", "Sentimental", "Optimistic", "Melancholic", "Frustrated", "Sympathetic", "Anticipating", "Cautious", "Disgusted", "Amazed", "Blissful", "Defiant", "Humble", "Insecure", "Regretful", "Satisfied", "Serious", "Whimsical"];
  
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
              alt="The house from the offer."
              src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
          />
          <Box display="flex" justifyContent="space-between" >
            <Typography display="flex" justifyContent="left" alignItems="center"
            component="h2" variant="h4" color="inherit" gutterBottom mt={3}>
              嘎波照騙
            </Typography>
            <Box display="flex" alignItems="center">
              <IconButton aria-label="fingerprint" color="secondary" onClick={()=>setonliked(!onliked)}>
                {onliked?(<FavoriteIcon  sx={{ width: "3rem", height: "3rem" }}/>):(<FavoriteBorderIcon  sx={{ width: "3rem", height: "3rem" }}/>) }
              </IconButton>
              <ShareIcon color="primary" sx={{ width: "3rem", height: "3rem" }}/>
            </Box>
          </Box>
          <Box display="flex" justifyContent="space-between" >
            <Typography color="inherit" gutterBottom>
              ID:135689
            </Typography>
            <Typography display="flex" justifyContent="left" alignItems="center">
              2022-05-08
            </Typography>
          </Box>
          <Divider textAlign="left">Tags</Divider>
          <List>
            {tag_array.map((e:any, id:any)=>(<GlobalChip text={e}/>))}
          </List>
          <Box mt={1}></Box>
          <Divider textAlign="left">Creator</Divider>
          <Box mt={1}></Box>
          <WorkCard />
          <Box mt={1}></Box>
          <Divider textAlign="left">Origin</Divider>
          <Box mt={1}></Box>
          <Paper elevation={0} sx={{ p: 2, bgcolor: main_theme.palette.info.main }}>
            <Typography>
              自然界提供無盡的藝術靈感，色彩繽紛的植被、變化萬千的天候、生動多樣的動植物都是藝術家創作的寶藏。透過觀察大自然，可以捕捉到晨露草地的清新、綻放花朵的生命力，並將這些瞬間永遠定格在畫布上。四季更替、天氣變化，提供多元的畫作主題，而動植物的形態和行為更是豐富的創作素材。走出室內，細心感受自然之美，或許你將在大自然的饗宴中找到深厚的藝術靈感。
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