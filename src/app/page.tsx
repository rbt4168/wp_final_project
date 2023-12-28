"use client"
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";

import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CssBaseline, Grid, IconButton, Paper, TextField, ThemeProvider, Typography } from "@mui/material";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useState } from "react";

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
        <CardActions>
          <Typography variant="body2">
            ID: 168598
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
}

export default function Home() {
  const [ searchText, setSearchText ] = useState("");

  const handleSubmit = () => {
    // TODO: search api
    let payload = {
      keyword: searchText,
    }
    alert(payload);
    
  };

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <NavigationBar/>

      <Grid
        mt={3}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={9} md={9} alignItems="center">
          <TextField
            id="search"
            placeholder="search"
            color="primary"
            size="small"
            sx={{width: "90%"}}
            value={searchText}
            onChange={(e:any)=>setSearchText(e.target.value)}
          />
          <Button sx={{width: "10%"}} variant="outlined" onClick={handleSubmit}>
            Search
          </Button>
        </Grid>
      </Grid>

      
      
      <DivLineCenter text="Followed Latest"/>

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

      <DivLineCenter text="Recent"/>

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

      <DivLineCenter text="Hot!"/>

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

      <FooterComponent/>
    </ThemeProvider>
  )
}
