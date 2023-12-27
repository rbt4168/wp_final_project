import { main_theme } from "@/lib/themes";
import { Box, Button, CssBaseline, Divider, Input, TextField, ThemeProvider, Typography, styled } from "@mui/material";

import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useState } from "react";
export default function UploadCreation(props: any) {
  const [title, setTitle] = useState("");
  const [origin, setOrigin] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  const handleSubmit = (e:any) => {
    // TODO: complete file upload
    console.log({title, origin, previewUrl});
  }

  const handleFileChange = (e:any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });
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
          id="name"
          placeholder="name"
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

      <Box mx={5} my={3} >
        <Button component="label" variant="contained" 
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
        <Button component="label" variant="outlined" onClick={handleSubmit}
          sx={{width: "60%"}}>
          完成上傳
        </Button>
      </Box>
        
    </ThemeProvider>
  )
}