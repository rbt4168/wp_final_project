"use client"
import { useEffect, useState } from "react";
import { Autocomplete, Box, Button, Chip, CssBaseline,
  Divider, Input, TextField, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { StyledRating } from "@/components/styledcomps";

import { main_theme } from "@/lib/themes";
import { PICTURE_SERVER_URL, default_tags } from "@/lib/utils";

import axios from "axios";

export default function ModifyCreation(props: any) {
  const { pic_id , trigger, actionUser } = props;

  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState("");
  const [recommand, setRecommand] = useState(5);
  const [previewUrl, setPreviewUrl] = useState("");

  const fixedOptions: string[] = [];
  const [value, setValue] = useState(fixedOptions);
  
  const all_tag = actionUser?.private_tags ? [ ...default_tags, ...actionUser?.private_tags?.map((e:any)=>("private-"+actionUser.username+"-"+e)) ] : default_tags;

  useEffect(()=>{
    const payload = {
      pic_id: pic_id,
    }

    axios.post("/api/getPicture", payload).then((e)=>{
      console.log(e.data.picture[0]);
      const pic = e.data.picture[0];

      setTitle(pic.name);
      setOrigin(pic.description);
      setRecommand(pic.recommand_point);
      setValue(pic.tags);
      setPreviewUrl(pic.url);
      console.log(pic.url);
    }).catch((e)=>console.error(e));
  }, [pic_id]);

  function handleSubmit() {
    const payload = {
      pic_id: pic_id,
      title: title,
      origin: origin,
      recommand: recommand,
      value: value,
    };
  
    axios.post("/api/modifycreation", payload)
      .then(() => {
        alert("修改成功!");
      }).catch(() => alert("修改作品失敗 "));
  };

  function handleDelete() {
    const payload = {
      pic_id: pic_id,
    };

    axios.post("/api/deletecreation", payload)
      .then(() => {
        alert("刪除作品成功!");
        trigger();
      }).catch(() => alert("刪除作品失敗 "));
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

      {previewUrl?(
        <Box mx={5} my={3} >
          <Box component="img"
            sx={{
              width: "60%",
            }}
            alt="preview"
            src={PICTURE_SERVER_URL+previewUrl}
          />
        </Box>
        ) : (<></>)
      }

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
          onChange={(event:any, newValue:any) => {
            setValue([
              ...fixedOptions,
              ...newValue.filter((option:any) => fixedOptions.indexOf(option) === -1),
            ]);
            console.log(value);
          }}
          options={all_tag}
          getOptionLabel={(option:any) => option}
          renderTags={(tagValue:any, getTagProps:any) =>
            tagValue.map((option:any, index:number) => (
              <Chip
                key={index}
                label={option}
                {...getTagProps({ index })}
                disabled={fixedOptions.indexOf(option) !== -1}
                variant="outlined" color="primary" sx={{bgcolor: "#FBF8CC"}}
              />
            ))
          }
          style={{ width: "60%" }}
          renderInput={(params:any) => (
            <TextField {...params} placeholder="這是什麼樣的作品呢？" />
          )}
        />
      </Box>

      <Box mx={5} my={3}>
        <Button component="label" variant="outlined" onClick={handleSubmit}
          sx={{width: "60%"}}>
          完成修改 Submit
        </Button>
      </Box>

      <Box mx={5} my={3}>
        <Button component="label" variant="contained" color="secondary" onClick={handleDelete}
          sx={{width: "60%"}}>
          刪除作品 Delete
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
    <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
      <Typography>Select Creation To Modify ...</Typography>
    </Box>
  </ThemeProvider>);
}