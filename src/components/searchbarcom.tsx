"use client"
import { main_theme } from "@/lib/themes";
import { Autocomplete, Button, Chip, CssBaseline, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import DivLineCenter from "./divline";

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useState } from "react";
import { default_tags } from "@/lib/utils";
import axios from "axios"
export default function SearchBar(props: any) {
  const { callback, setConsequence } = props;
  const posOptions: string[] = [];
  const [posvalue, setPosValue] = useState(posOptions);
  
  const negOptions: string[] = [];
  const [negvalue, setNegValue] = useState(negOptions);

  const [ searchText, setSearchText ] = useState("");

  useEffect(()=>{
    const pload = JSON.parse(localStorage.getItem("payload") || "{}");
    if(pload !== undefined) {
      console.log(pload);
      if(pload.text) setSearchText(pload.text);
      if(pload.ptag) setPosValue(pload.ptag);
      if(pload.ntag) setNegValue(pload.ntag);
      if(pload.seq) setConsequence(pload.seq);
    }
    localStorage.setItem("payload", "{}");
  }, [])

  function handleClick() {
    const payload = {
      target: searchText,
      tags: [ ...posvalue.map((e:string)=>({tagname: e, positive: true})),
              ...negvalue.map((e:string)=>({tagname: e, positive: false})) ]
    }

    axios.post("/api/search", payload)
    .then((e:any) => {
      const seq = e.data.tids;
      console.log(e.data.tids);
      setConsequence(seq);
      callback({text: searchText, ptag: posvalue, ntag: negvalue, seq: seq});
    }).catch((e:any) => (console.error(e)));
  }

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
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
          <Button sx={{width: "10%"}} variant="outlined" onClick={handleClick}>
            Search
          </Button>
        </Grid>
      </Grid>
      
      <DivLineCenter text="Tag Restrictions"/>
      <Grid
        mt={1}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={4} md={4}>
        <Typography><CheckIcon color="primary"/> Must Tag</Typography>
        <Autocomplete
          multiple
          value={posvalue}
          onChange={(event:any, newValue:any) => {
            setPosValue([
              ...posOptions,
              ...newValue?.filter((option:any) => posOptions.indexOf(option) === -1),
            ]);
            console.log(posvalue);
          }}
          options={default_tags?.filter((option) => !negvalue?.includes(option))}
          // getOptionLabel={(option) => option}
          renderTags={(tagValue:any, getTagProps:any) =>
            tagValue.map((option:any, index:number) => (
              <Chip
                key={index}
                label={option}
                {...getTagProps({ index })}
                disabled={posOptions.indexOf(option) !== -1}
                variant="outlined" color="primary" sx={{bgcolor: "#FBF8CC"}}
              />
            ))
          }
          sx={{ width: "100%" }}
          renderInput={(params:any) => (
            <TextField {...params} placeholder="可愛的標籤們~" />
          )}
        />
        </Grid>
        <Grid item xs={1} md={1}>

        </Grid>
        <Grid item xs={4} md={4}>
          
        <Typography><CloseIcon color="secondary"/> Block Tag</Typography>
        <Autocomplete
          multiple
          value={negvalue}
          onChange={(event:any, newValue:any) => {
            setNegValue([
              ...negOptions,
              ...newValue?.filter((option:any) => negOptions.indexOf(option) === -1),
            ]);
            console.log(negvalue);
          }}
          options={default_tags?.filter((option) => !posvalue?.includes(option))}
          getOptionLabel={(option:any) => option}
          renderTags={(tagValue:any, getTagProps:any) =>
            tagValue.map((option:any, index:number) => (
              <Chip
                key={index}
                label={option}
                {...getTagProps({ index })}
                disabled={negOptions.indexOf(option) !== -1}
                variant="outlined" color="primary" sx={{bgcolor: "#FBF8CC"}}
              />
            ))
          }
          sx={{ width: "100%" }}
          renderInput={(params:any) => (
            <TextField {...params} placeholder="可愛的標籤們~" />
          )}
        />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}