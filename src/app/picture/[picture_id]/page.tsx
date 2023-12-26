"use client"

import FooterComponent from "@/components/footer"
import NavigationBar from "@/components/navbar"
import { main_theme } from "@/lib/themes"
import { Box, Chip, CssBaseline, Divider, Grid, IconButton, List, ThemeProvider, Typography } from "@mui/material"
import { generateRandomColor } from "@/lib/utils"


import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";
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

export default function PictureFull(props: any) {
  const { params } = props;
  const { picture_id } = params;

  var tag_array = ["Happy", "Sad", "Angry", "Excited", "Anxious", "Relaxed", "Confident", "Nervous", "Playful", "Thoughtful", "Content", "Bored", "Energetic", "Tired", "Curious", "Surprised", "Motivated", "Inspired", "Grateful", "Hopeful", "Enthusiastic", "Pensive", "Reflective", "Inquisitive", "Amused", "Disappointed", "Overwhelmed", "Peaceful", "Irritated", "Proud", "Guilty", "Jealous", "Apathetic", "Sentimental", "Optimistic", "Melancholic", "Frustrated", "Sympathetic", "Anticipating", "Cautious", "Disgusted", "Amazed", "Blissful", "Defiant", "Humble", "Insecure", "Regretful", "Satisfied", "Serious", "Whimsical"];
  
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
          <Typography display="flex" justifyContent="left" alignItems="center"
          component="h2" variant="h4" color="inherit" gutterBottom mt={3}>
            嘎波照騙
          </Typography>
          <Typography display="flex" justifyContent="left" alignItems="center">
            20220508
          </Typography>
          <Divider textAlign="left">Tags</Divider>
          <List>
            {tag_array.map((e:any, id:any)=>(<Chip key={id} variant="outlined" color="primary" label={e} sx={{bgcolor: "#FBF8CC"}}/>))}
          </List>

          <Divider textAlign="left">Creator</Divider>
          <WorkCard />
        </Grid>
        <Grid item xs={1}>
          <Divider orientation="vertical" flexItem />
        </Grid>
        <Grid item xs={2}>
          <Typography display="flex" justifyContent="left" alignItems="center"
          component="h2" variant="h4" color="inherit" gutterBottom mt={3}>
            Related Works
          </Typography>
          <Divider />
        </Grid>
      </Grid>
      <FooterComponent/>
    </ThemeProvider>
  )
}