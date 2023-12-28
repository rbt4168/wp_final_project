"use client"
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";

import { Button, CssBaseline, Grid, TextField, ThemeProvider } from "@mui/material";

import { useState, useEffect } from "react";
import { WorkCardComponent } from "@/components/workcomponent";
import axios from "axios"
export default function Home() {
  const [ searchText, setSearchText ] = useState("");

  const [ foArr, setFoArr ] = useState([0,0,0,0,0]);
  const [ hotArr, setHotArr ] = useState([0,0,0,0,0]);
  const [ recentArr, setRecentArr ] = useState([0,0,0,0,0]);

  useEffect(()=>{
    axios.get("/api/homeFollowedLatest").then((e)=>{
      console.log(e.data);
    }).catch((e)=>console.error(e));

    axios.get("/api/homeRecent").then((e)=>{
      // console.log(e.data);
      setRecentArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));

    axios.get("/api/homeHot").then((e)=>{
      setHotArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));

  }, []);
  const handleSubmit = () => {
    // TODO: search api
    const payload = {
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
        {foArr.map((e:any, id:any)=>{
        return(
        <Grid key={id} item xs={12} md={2}>
          <WorkCardComponent pic_id={e} />
        </Grid>
        )
      })}
      </Grid>

      <DivLineCenter text="Recent"/>

      <Grid container 
        justifyContent="center"
        alignItems="center"
      >
        {recentArr.map((e:any, id:any)=>{
          return(
          <Grid key={id} item xs={12} md={2}>
            <WorkCardComponent pic_id={e} />
          </Grid>
          )
        })}
      </Grid>

      <DivLineCenter text="Hot!"/>

      <Grid container 
        justifyContent="center"
        alignItems="center"
      >
        {hotArr.map((e:any, id:any)=>{
          return(
          <Grid key={id} item xs={12} md={2}>
            <WorkCardComponent pic_id={e} />
          </Grid>
          )
        })}
      </Grid>

      <FooterComponent/>
    </ThemeProvider>
  )
}
