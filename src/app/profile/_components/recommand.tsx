"use client"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, Grid, ThemeProvider,
    Typography, styled, Rating, List, ListItem, IconButton, Button, ListItemButton } from "@mui/material"

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";
import DivLineCenter, { DivLineCenterFull } from "@/components/divline";
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});
function WorkCard(props: any) {
  return (
    <ListItem disablePadding>
    <ListItemButton>
      <Grid container spacing={2}>
        <Grid item>
          <Box
              component="img"
              sx={{
                height: 128,
                width: 128,
              }}
              alt="a"
              src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                嘎波的作品 {Math.random()}
              </Typography>
              <Typography variant="body2" gutterBottom>
                ID: 142857142857
              </Typography>
              <Typography variant="body2" gutterBottom>
                478 <FavoriteIcon color="secondary" />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <StyledRating
                  name="customized-color"
                  readOnly
                  defaultValue={Math.floor(Math.random()*10)}
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
export default function RecommandWork(props: any) {
  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        作品管理 Artworks
      </Typography>
      <Divider />
      <Box>
        <List>
          <DivLineCenterFull text="Recent"/>
          {Array.from(Array(2)).map((_, index) => (<WorkCard />))}
          <DivLineCenterFull text="2023-11"/>
          {Array.from(Array(1)).map((_, index) => (<WorkCard />))}
          <DivLineCenterFull text="2023-10"/>
          {Array.from(Array(1)).map((_, index) => (<WorkCard />))}
        </List>
      </Box>
      
    </ThemeProvider>
  )
}