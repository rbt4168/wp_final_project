"use client"
import { main_theme } from "@/lib/themes";
import { Box, Button, CssBaseline, Grid, Link, Paper, ThemeProvider, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

export default function CreatorHeader(props: any) {
  const { activeAuthor, setActiveAuthor, authorId } = props;
  const [ linkArr, setLinkArr ] = useState(["", "", "", ""])

  const [ followed, setFollowed ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState({
    liked_user:[]
  });
  const [disable, setDisable] = useState(false);
  function handleFollow(st: boolean) {
    setDisable(true);
    const payload = {
      author_id: authorId,
      like: st,
    }
    
    axios.post("/api/likeAuthor", payload).then((e)=>{
      console.log(e.data.updatedUser);
      setCurrentUser(e.data.updatedUser);
    }).catch((e)=>console.error(e)).finally(()=>(setDisable(false)));
  }

  useEffect(()=>{
    console.log(activeAuthor.links)
    const linkx = activeAuthor.links?.split(",");
    const newArr = ["", "", "", ""];
    linkx?.forEach((element:any,id:any) => {
      newArr[id] = element;
    });
    setLinkArr(newArr);
  }, [activeAuthor]);

  useEffect(()=>{
    axios.get('/api/getNowUser').then((e)=>{
      setCurrentUser(e.data.user[0]);
    }).catch((e)=>console.error(e));
  }, [])

  useEffect(()=>{
    setFollowed(currentUser?.liked_user?.includes(parseInt(authorId)));
  }, [currentUser]);

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
            {followed?(
              <Button component="label" 
                color="secondary" variant="contained"
                sx={{ fontSize: "25px" }}
                onClick={()=>handleFollow(false)}
                disabled={disable}
              >
                UnFollow
              </Button>
            ):(
              <Button component="label" 
                color="primary" variant="contained"
                sx={{ fontSize: "25px" }}
                onClick={()=>handleFollow(true)}
                disabled={disable}
              >
                Follow
              </Button>
            )}
            
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