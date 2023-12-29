import { main_theme } from "@/lib/themes";
import { Autocomplete, Button, Chip, CssBaseline, Grid, TextField, ThemeProvider, Typography } from "@mui/material";
import DivLineCenter from "./divline";

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import { useState } from "react";
import { default_tags } from "@/lib/utils";
export default function SearchBar(props: any) {
  
  const posOptions: string[] = [];
  const [posvalue, setPosValue] = useState(posOptions);
  
  const negOptions: string[] = [];
  const [negvalue, setNegValue] = useState(negOptions);

  const [ searchText, setSearchText ] = useState(""); 

  function handleClick() {
    let payload = {
      target: searchText,
      tags: [ ...posvalue.map((e)=>({tagname: e, postive: true})),
              ...negvalue.map((e)=>({tagname: e, postive: false})) ]
    }

    console.log(payload);
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
            onChange={(e)=>setSearchText(e.target.value)}
          />
          <Button sx={{width: "10%"}} variant="outlined" onClick={handleClick}>
            Search
          </Button>
        </Grid>
      </Grid>
      
      <DivLineCenter text="Search Restriction Priority List"/>
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
          onChange={(event, newValue) => {
            setPosValue([
              ...posOptions,
              ...newValue.filter((option) => posOptions.indexOf(option) === -1),
            ]);
            console.log(posvalue);
          }}
          options={default_tags.filter((option) => !negvalue.includes(option))}
          // getOptionLabel={(option) => option}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                disabled={posOptions.indexOf(option) !== -1}
                variant="outlined" color="primary" sx={{bgcolor: "#FBF8CC"}}
              />
            ))
          }
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} placeholder="可愛的標籤們~" />
          )}
        />
        </Grid>
        <Grid item xs={1} md={1}>

        </Grid>
        <Grid item xs={4} md={4}>
          
        <Typography><CloseIcon color="secondary"/> No Tag</Typography>
        <Autocomplete
          multiple
          value={negvalue}
          onChange={(event, newValue) => {
            setNegValue([
              ...negOptions,
              ...newValue.filter((option) => negOptions.indexOf(option) === -1),
            ]);
            console.log(negvalue);
          }}
          options={default_tags.filter((option) => !posvalue.includes(option))}
          getOptionLabel={(option) => option}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                disabled={negOptions.indexOf(option) !== -1}
                variant="outlined" color="primary" sx={{bgcolor: "#FBF8CC"}}
              />
            ))
          }
          sx={{ width: "100%" }}
          renderInput={(params) => (
            <TextField {...params} placeholder="可愛的標籤們~" />
          )}
        />
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}