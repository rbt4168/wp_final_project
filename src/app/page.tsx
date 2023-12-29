"use client"

import { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import SearchBar from "@/components/searchbarcom";
import { WorkCardComponent } from "@/components/workcomponent";

import { main_theme } from "@/lib/themes";

import { useRouter } from 'next/navigation';

import axios from "axios"

export default function Home() {
  const [ foArr, setFoArr ] = useState([0,0,0,0,0]);
  const [ hotArr, setHotArr ] = useState([0,0,0,0,0]);
  const [ recentArr, setRecentArr ] = useState([0,0,0,0,0]);

  const router = useRouter();

  useEffect(()=>{
    axios.get("/api/homeFollowedLatest").then((e:any)=>{
      setFoArr(e.data.pictureIds);
    }).catch((e:any)=>console.error(e));

    axios.get("/api/homeRecent").then((e:any)=>{
      setRecentArr(e.data.pictureIds);
    }).catch((e:any)=>console.error(e));

    axios.get("/api/homeHot").then((e:any)=>{
      setHotArr(e.data.pictureIds);
    }).catch((e:any)=>console.error(e));

  }, []);

  const callback = (payload:any) => {
    localStorage.setItem("payload", JSON.stringify(payload));
    router.push('/search');
  };

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <NavigationBar/>

      <SearchBar callback={callback} setConsequence={()=>{}}/>

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
