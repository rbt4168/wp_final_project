"use client"
import { main_theme } from "@/lib/themes";
import { Box, Button, CssBaseline, Grid, Link, Paper, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export default function CreatorHeader(props: any) {
  const { activeAuthor } = props;
  const [ linkArr, setLinkArr ] = useState(["", "", "", ""])

  useEffect(()=>{
    console.log(activeAuthor.links)
    let linkx = activeAuthor.links?.split(",");
    let newArr = ["", "", "", ""];
    linkx?.forEach((element:any,id:any) => {
      newArr[id] = element;
    });
    setLinkArr(newArr);
  }, [activeAuthor])

  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Paper sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // height: "60vh",
          paddingTop: "100px",
          paddingBottom: "100px",
          backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
        }}
      >
        <Box>
          <Typography display="flex" justifyContent="center" alignItems="center"
            component="h1" variant="h3" color="inherit"
            sx={{fontSize:"85px", width: "100%"}} gutterBottom
          >          
            {activeAuthor.name}
          </Typography>
          
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box component="img"
              sx={{
                height: "10%",
                width: "10%",
                border: "1px solid",
                borderRadius: "50%"
              }}
              alt="The house from the offer."
              src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
            />
          </Box>
          
          <Typography display="flex" justifyContent="center" alignItems="center"
            component="h2" variant="h4" color="inherit"
            sx={{width: "100%"}} mt={3} gutterBottom
          >
            {activeAuthor.quote}
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button component="label" 
              color="primary" variant="contained"
            >
              Follow
            </Button>
          </Box>
        </Box>
      </Paper>
      <Grid container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={9} md={9}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
          <Typography variant="h6" gutterBottom>
            關於我:
          </Typography>
          <Typography>
            {activeAuthor.bio}
          </Typography >
        </Paper>
      </Grid>
    </Grid>
    <Grid container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={9} md={9}>
        <Grid container>
          {linkArr.map((e:any,id:any)=>{
              return e ? (
                <Grid item xs={3}>
                  <Link href={linkArr[id]} variant="body2">
                    {linkArr[id]}
                  </Link>
                </Grid>
              ):(<></>)
            })
          }
        </Grid>
      </Grid>
    </Grid>
    </ThemeProvider>
  )
}