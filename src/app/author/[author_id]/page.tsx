"use client"

import { useEffect, useState } from "react";
import { Button, CssBaseline, Grid } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

import CreatorHeader from "@/components/creatorheader";
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { WorkCardComponent } from "@/components/workcomponent";

import { chunkArray } from "@/lib/utils";
import { main_theme } from "@/lib/themes"

import axios from "axios";

export default function AuthorPage(props: any) {
  const { params } = props;
  const { author_id } = params;

  const [ activeAuthor, setActiveAuthor ] = useState({
    name: "",
    quote: "",
    bio: "",
    links: "",
    works: [],
  })

  const [ recArr, setRecArr ] = useState([]);
  const [ recentArr, setRecentArr ] = useState([]);
  const [ latArr, setLatArr ] = useState([[]] as any[][]);

  useEffect(()=>{
    axios.get("/api/getAuthorById?user_id="+author_id).then((e)=>{
      setActiveAuthor(e.data);
    }).catch((e)=>console.error(e));

    const payload = {
      author_id: author_id
    }

    axios.post("/api/authorHighToLow", payload).then((e)=>{
      setRecentArr(e.data.pictureIds);
      setLatArr(chunkArray(e.data.pictureIds, 5));
    }).catch((e)=>console.error(e));

    axios.post("/api/authorRecommand", payload).then((e)=>{
      setRecArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));

  }, [])

  return(
  <ThemeProvider theme={main_theme}>
    <CssBaseline />
    <NavigationBar />

    <CreatorHeader activeAuthor={activeAuthor} setActiveAuthor={setActiveAuthor} authorId={author_id}/>

    <Grid container 
      justifyContent="center"
      alignItems="center"
      mt={2}
    >
      <Button href={"/donate/"+author_id} component="a" variant="contained"
        sx={{width: "40%"}}>
        Sponsor Creator
      </Button>
    </Grid>

    <DivLineCenter text="Top 3 Recommanded by Author"/>
    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      {recArr.map((e:any, id:any)=>{
        if(id>=3) return(<></>);
        return(
        <Grid key={id} item xs={12} md={3}>
          <WorkCardComponent pic_id={e} />
        </Grid>
        )
      })}
    </Grid>

    <DivLineCenter text="Latest 5 Works"/>
    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      {recentArr.map((e:any, id:any)=>{
        if(id>=5) return(<></>);
        return(
        <Grid key={id} item xs={12} md={2}>
          <WorkCardComponent pic_id={e} />
        </Grid>
        )
      })}
    </Grid>

    {latArr.length > 1 ? (
    <>
      <DivLineCenter text="Previous Works"/>
      {
        latArr.map((e0:any[],idx:any)=>{
          if(idx===0) return(<></>);
          return(
            <Grid container 
              justifyContent="center"
              alignItems="center"
            >
              {e0.map((e:any, id:any)=>{
                return(
                <Grid key={id} item xs={12} md={2}>
                  <WorkCardComponent pic_id={e} />
                </Grid>
                )
              })}
            </Grid>
          )
        })
      }
    </>
    ) : (<></>) }

    <FooterComponent/>
  </ThemeProvider>
  )
}