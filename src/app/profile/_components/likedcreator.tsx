"use client"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider,
  Grid, ThemeProvider, Typography, IconButton } from "@mui/material"

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
export default function LikedCreator(props: any) {
  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        喜歡的創作者 Creators
      </Typography>
      <Divider />
      <Box mx={5} my={3}>
        <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(40)).map((_, index) => (
            <Grid item xs={12} sm={12} md={12} key={index}>
              <WorkCard />
            </Grid>
          ))}
        </Grid>
      </Box>
      
    </ThemeProvider>
  )
}