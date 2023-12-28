"use client"
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";

import { Button, CssBaseline, Grid, TextField, ThemeProvider } from "@mui/material";

import { useState } from "react";
import { WorkCardComponent } from "@/components/workcomponent";

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
          <WorkCardComponent pic_id={1} />
        </Grid>
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
      </Grid>

      <DivLineCenter text="Recent"/>

      <Grid container 
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={6} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={7} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={8} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={9} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={10} />
        </Grid>
      </Grid>

      <DivLineCenter text="Hot!"/>

      <Grid container 
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={11} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={12} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={13} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={14} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={15} />
        </Grid>
      </Grid>

      <FooterComponent/>
    </ThemeProvider>
  )
}
