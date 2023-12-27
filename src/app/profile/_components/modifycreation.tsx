import { main_theme } from "@/lib/themes";
import { Autocomplete, Box, Button, Chip, CssBaseline, Divider, Input, TextField, ThemeProvider, Typography, styled } from "@mui/material";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
import axios from "axios";
import { StyledRating } from "@/components/styledcomps";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { default_tags } from "@/lib/utils";

export default function ModifyCreation(props: any) {

  const { pic_id } = props;
  

  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  
  const [recommand, setRecommand] = useState(5);

  const fixedOptions: string[] = [];
  const [value, setValue] = useState(fixedOptions);
  

  const handleSubmit = (e: any) => {
    // TODO: Update User Profile
    alert(title);
    alert(origin);
    alert(previewUrl);
    
    const data = {
      title,
      origin,
      previewUrl,
    };
  
    // Make the API call
    axios.post("/api/uploadCreation", data)
      .then(response => {
        alert("success");
      })
      .catch((e) => {
        // Handle error
        alert("Error occurred while updating profile");
      });
  };

  return pic_id ? (
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        修改作品 Modify Creation
      </Typography>
        
      <Divider />

      <Box mx={5} my={3}>
        <Typography>ID: {pic_id}</Typography>
      </Box>

      <Box mx={5} my={3}>
        <Typography>作品名稱 Title</Typography>
        <Input
          id="title"
          placeholder="title"
          color="primary"
          sx={{width: "60%"}}
          value={title}
          onChange={(e:any)=>setTitle(e.target.value)}
        />
      </Box>

      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
        <Typography>緣起 Origin</Typography>
        <TextField
          placeholder="介紹一下吧！"
          color="primary"
          multiline
          rows={5}
          sx={{width: "60%"}}
          value={origin}
          onChange={(e:any)=>setOrigin(e.target.value)}
        />
      </Box>

      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
        <Typography>推薦度 Recommand</Typography>
        <StyledRating
          name="customized-color"
          defaultValue={5}
          max={10}
          getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
          value={recommand}
          onChange={(e:any)=>setRecommand(e.target.value)}
        />
      </Box>

      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
        <Typography>標籤 Tags</Typography>
        <Autocomplete
          multiple
          id="fixed-tags-demo"
          value={value}
          onChange={(event, newValue) => {
            setValue([
              ...fixedOptions,
              ...newValue.filter((option) => fixedOptions.indexOf(option) === -1),
            ]);
            console.log(value);
          }}
          options={default_tags}
          getOptionLabel={(option) => option}
          renderTags={(tagValue, getTagProps) =>
            tagValue.map((option, index) => (
              <Chip
                label={option}
                {...getTagProps({ index })}
                disabled={fixedOptions.indexOf(option) !== -1}
                variant="outlined" color="primary" sx={{bgcolor: "#FBF8CC"}}
              />
            ))
          }
          style={{ width: "60%" }}
          renderInput={(params) => (
            <TextField {...params} placeholder="這是什麼樣的作品呢？" />
          )}
        />
      </Box>

      <Box mx={5} my={3}>
        <Button component="label" variant="outlined" onClick={handleSubmit}
          sx={{width: "60%"}}>
          完成上傳
        </Button>
      </Box>
        
    </ThemeProvider>
  ) : (
  <ThemeProvider theme={main_theme}>
    <CssBaseline/>
    <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
      修改作品 Modify Creation
    </Typography>
      
    <Divider />
    
  </ThemeProvider>);
}