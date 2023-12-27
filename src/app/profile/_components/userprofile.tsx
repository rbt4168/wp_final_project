"use client"
import { main_theme } from "@/lib/themes"
import { Box, Button, CssBaseline, Divider, Input, TextField, ThemeProvider, Typography } from "@mui/material"
// import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserProfile() {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: sign in logic
    // axios.post("/api/userprofile", {}).then().catch(() => alert("你到底做什麼 解釋一下"))
    
  };
  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />

      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        帳號資料
      </Typography>
      
      <Divider />
      <Box mx={5} my={3}>
        <Typography>名稱</Typography>
        <Input
          id="name"
          placeholder="name"
          color="primary"
          sx={{width: "60%"}}
        />
      </Box>
      <Box mx={5} my={3}>
        <Typography>座右銘</Typography>
        <Input
          id="quote"
          placeholder="quote"
          color="primary"
          sx={{width: "60%"}}
        />
      </Box>
      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
        <Typography>稱謂</Typography>
        <Input
          id="title"
          placeholder="title"
          color="primary"
          sx={{width: "60%"}}
        />
      </Box>
      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
        <Typography>小屋介紹</Typography>
        <TextField
          placeholder="介紹一下吧！"
          color="primary"
          multiline
          rows={5}
          sx={{width: "60%"}}
        />
      </Box>
      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}} >
        <Typography>其他連結</Typography>
        <TextField
          id="link0"
          placeholder="link0"
          color="primary"
          size="small"
          sx={{width: "60%"}}
        />
        <TextField
          id="link1"
          placeholder="link1"
          color="primary"
          size="small"
          sx={{width: "60%"}}
        />
        <TextField
          id="link2"
          placeholder="link2"
          color="primary"
          size="small"
          sx={{width: "60%"}}
        />
        <TextField
          id="link3"
          placeholder="link3"
          color="primary"
          size="small"
          sx={{width: "60%"}}
        />
        
      </Box>
      <form onSubmit={handleSubmit}>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          修改資料 
        </Button>
      </form>
    </ThemeProvider>
  )
}