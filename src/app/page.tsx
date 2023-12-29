"use client"
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";

import { CssBaseline, Grid, ThemeProvider } from "@mui/material";

import { useState, useEffect } from "react";
import { WorkCardComponent } from "@/components/workcomponent";
import SearchBar from "@/components/searchbarcom";

import axios from "axios"
export default function Home() {
  // const [ searchText, setSearchText ] = useState("");

  const [ foArr, setFoArr ] = useState([0,0,0,0,0]);
  const [ hotArr, setHotArr ] = useState([0,0,0,0,0]);
  const [ recentArr, setRecentArr ] = useState([0,0,0,0,0]);

  useEffect(()=>{
    axios.get("/api/homeFollowedLatest").then((e:any)=>{
      // console.log(e.data);
      setFoArr(e.data.pictureIds);
    }).catch((e:any)=>console.error(e));

    axios.get("/api/homeRecent").then((e:any)=>{
      // console.log(e.data);
      setRecentArr(e.data.pictureIds);
    }).catch((e:any)=>console.error(e));

    axios.get("/api/homeHot").then((e:any)=>{
      setHotArr(e.data.pictureIds);
    }).catch((e:any)=>console.error(e));

  }, []);
  
  const handleSubmit = () => {
    // TODO: search api
    // const payload = {
    //   keyword: searchText,
    // }
    // alert(payload);
    // axios.post("/api/search", payload).then((e:any)=>{
    //   setHotArr(e.data.pictureIds);
    // }).catch((e:any)=>console.error(e));
  };

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <NavigationBar/>

      <SearchBar />
      
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
