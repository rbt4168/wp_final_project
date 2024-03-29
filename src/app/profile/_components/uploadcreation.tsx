"use client"
import { useState } from "react";
import { Autocomplete, Box, Button, Chip, CssBaseline, 
  Divider, Input, TextField, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { StyledRating, VisuallyHiddenInput } from "@/components/styledcomps";

import { default_tags } from "@/lib/utils";
import { main_theme } from "@/lib/themes";

import axios from "axios";

export default function UploadCreation(props: any) {
  const { trigger, actionUser } = props;

  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [recommand, setRecommand] = useState(5);

  const fixedOptions: string[] = [];
  const [value, setValue] = useState(fixedOptions);
  const [disabled, setDisabled] = useState(false);

  const [uploaddis, setUploaddis] = useState(true);

  const all_tag = actionUser?.private_tags ? [ ...default_tags, ...actionUser?.private_tags?.map((e:any)=>("private-"+actionUser.username+"-"+e)) ] : default_tags;

  function handleSubmit() {
    setDisabled(true);
    const payload = {
      title: title,
      origin: origin,
      previewUrl: previewUrl,
      recommand: recommand,
      value: value,
    };

    axios.post("/api/uploadCreation", payload)
      .then(() => {
        alert("上傳成功!");
        trigger();
      }).catch((e)=>console.error(e)).finally(() =>{
        setTitle("");
        setOrigin("");
        setPreviewUrl("");
        setRecommand(5);
        setValue(fixedOptions);
        setDisabled(false);
      });
  };

  // Preview
  function handleFileChange(e:any) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
      setUploaddis(false);
    } else {
      setUploaddis(true);
    }
  };

  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        上傳作品 Creation
      </Typography>
      <Divider />

      <Box mx={5} my={3}>
        <Typography>作品名稱 Title</Typography>
        <Input
          id="title"
          placeholder="title"
          color="primary"
          sx={{width: "60%"}}
          value={title}
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
          value={recommand}
          onChange={(e:any)=>setRecommand(e.target.value)}
        />
      </Box>

      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
        <Typography>標籤 Tags</Typography>
        <Autocomplete
          multiple
          id="taginput_component"
          value={value}
          disabled={disabled}
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
                variant="outlined" color="primary"
                sx={{bgcolor: option.includes("private")?"#FADBE5":"#FBF8CC"}}
              />
            ))
          }
          style={{ width: "60%" }}
          renderInput={(params:any) => (
            <TextField {...params} placeholder="這是什麼樣的作品呢？" />
          )}
        />
      </Box>

      <Box mx={5} my={3} >
        <Button component="label" variant="contained" 
          disabled={disabled}
          sx={{width: "60%"}} startIcon={<CloudUploadIcon />}>
          Upload Creation
          <VisuallyHiddenInput type="file" accept="image/*" onChange={handleFileChange}/>
        </Button>
      </Box>

      {previewUrl?(
        <Box mx={5} my={3} >
          <Box component="img"
            sx={{
              width: "60%",
            }}
            alt="preview"
            src={previewUrl}
          />
        </Box>
        ) : (<></>)
      }

      <Box mx={5} my={3}>
        <Button component="label" variant="outlined" onClick={handleSubmit} disabled={disabled || uploaddis}
          sx={{width: "60%"}}>
          完成上傳 Submit
        </Button>
      </Box>
    </ThemeProvider>
  )
}