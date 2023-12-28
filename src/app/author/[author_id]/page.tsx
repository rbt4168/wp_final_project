"use client"
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes"
import { CssBaseline, Grid, ThemeProvider } from "@mui/material"
import { useEffect, useState } from "react";
import CreatorHeader from "@/components/creatorheader";
import DivLineCenter from "@/components/divline";
import axios from "axios";
import { WorkCardComponent } from "@/components/workcomponent";

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

  useEffect(()=>{
    axios.get("/api/getAuthorById?user_id="+author_id).then((e)=>{
      console.log(e.data);
      setActiveAuthor(e.data);
    }).catch((e)=>console.error(e));
    

    // let payload = {
    //   author_id: author_id
    // }

    // axios.post("/api/apiapaiaiiii", payload).then((e)=>{
    //   console.log(e);
    // }).catch((e)=>console.error(e));

    axios.post("/api/authorHighToLow", payload).then((e)=>{
      console.log(e);
    }).catch((e)=>console.error(e));
    axios.post("/api/authorLowToHigh", payload).then((e)=>{
      console.log(e);
    }).catch((e)=>console.error(e));
    axios.post("/api/authorRecommand", payload).then((e)=>{
      console.log(e);
    }).catch((e)=>console.error(e));
    axios.post("/api/authorPopular", payload).then((e)=>{
      console.log(e);
    }).catch((e)=>console.error(e));
    
  }, [])

  return(
  <ThemeProvider theme={main_theme}>
    <CssBaseline />
    <NavigationBar />
    <CreatorHeader activeAuthor={activeAuthor} setActiveAuthor={setActiveAuthor} authorId={author_id}/>

    <DivLineCenter text="Top 3 Recommanded by Author"/>
    
    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={3}>
        <WorkCardComponent pic_id={1} />
      </Grid>
      <Grid item xs={12} md={3}>
        <WorkCardComponent pic_id={1} />
      </Grid>
      <Grid item xs={12} md={3}>
        <WorkCardComponent pic_id={1} />
      </Grid>
    </Grid>

    <DivLineCenter text="Latest 5 Works"/>

    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={1} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={1} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={1} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={1} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={1} />
      </Grid>
    </Grid>

    <DivLineCenter text="Previous Works"/>

    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={2} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={3} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={4} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={5} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={6} />
      </Grid>
    </Grid>
    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={0} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={0} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={0} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={0} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={0} />
      </Grid>
    </Grid>
    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={0} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={0} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={0} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={0} />
      </Grid>
      <Grid item xs={12} md={2}>
        <WorkCardComponent pic_id={0} />
      </Grid>
    </Grid>
    
    <FooterComponent/>
  </ThemeProvider>
  )
}