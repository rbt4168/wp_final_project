"use client"
import GlobalChip from "@/components/chipglobal";
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";
import { chunkArray, dnd_handler, generateRandomColor } from "@/lib/utils";
import { Autocomplete, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Chip, CssBaseline, Divider, Grid, IconButton, List, ListItem, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";


import { WorkCardComponent } from "@/components/workcomponent";
import SearchBar from "@/components/searchbarcom";

export default function SearchPage(props: any) {
  const [ consequence, setConsequence ] = useState([])
  const [ latArr, setLatArr ] = useState([[]] as any[][]);

  useEffect(()=>{
    setLatArr(chunkArray(consequence, 5));
  }, [consequence]);

  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <NavigationBar/>

      <SearchBar callback={()=>{}} setConsequence={setConsequence}/>

      <DivLineCenter text={"Consequence ("+consequence?.length + ")"}/>

      {latArr.map((e0:any[],idx:any)=>{
          return(
            <Grid key={idx} container 
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

      <FooterComponent/>
    </ThemeProvider>
  )
}