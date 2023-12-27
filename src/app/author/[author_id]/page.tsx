"use client"
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes"
import { Box, Card, CardActionArea, CardContent, CardMedia, CssBaseline, Grid, IconButton, ThemeProvider, Typography } from "@mui/material"
import { useState } from "react";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CreatorHeader from "@/components/creatorheader";
import DivLineCenter from "@/components/divline";
function RecWorkCard(props: any) {
  const [onliked, setonliked] = useState(true);
  return (
    <Box sx={{margin: "30px"}}>
      <Card sx={{ maxWidth: "100%" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
          />
        </CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ maxWidth:'100%', display: "flex", justifyContent:"space-between" }}>
            <Box>
              Lizard
            </Box>
            <IconButton aria-label="fingerprint" color="secondary" onClick={()=>setonliked(!onliked)}>
              {onliked?(<FavoriteIcon />):(<FavoriteBorderIcon/>) }
            </IconButton>
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default function AuthorPage(props: any) {
  const { params } = props;
  const { author_id } = params;

  return(
  <ThemeProvider theme={main_theme}>
    <CssBaseline />
    <NavigationBar />
    <CreatorHeader />

    <DivLineCenter text="Top 3 Recommanded by Author"/>
    
    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={3}>
        <RecWorkCard />
      </Grid>
      <Grid item xs={12} md={3}>
        <RecWorkCard />
      </Grid>
      <Grid item xs={12} md={3}>
        <RecWorkCard />
      </Grid>
    </Grid>

    <DivLineCenter text="Latest 5 Works"/>

    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={2}>
        <RecWorkCard />
      </Grid>
      <Grid item xs={12} md={2}>
        <RecWorkCard />
      </Grid>
      <Grid item xs={12} md={2}>
        <RecWorkCard />
      </Grid>
      <Grid item xs={12} md={2}>
        <RecWorkCard />
      </Grid>
      <Grid item xs={12} md={2}>
        <RecWorkCard />
      </Grid>
    </Grid>


    <DivLineCenter text="Previous Works"/>

    <Grid container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={9} md={9}>
        <Grid container spacing={{ xs: 2, md: 0 }} columns={{ xs: 4, sm: 4, md: 12 }}>
          {Array.from(Array(40)).map((_, index) => (
            <Grid item xs={2} sm={2} md={2} key={index}>
              <RecWorkCard />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
    
    <FooterComponent/>
  </ThemeProvider>
  )
}