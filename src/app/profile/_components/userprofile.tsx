"use client"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, Input, TextField, ThemeProvider, Typography } from "@mui/material"

export default function UserProfile() {
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
      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
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
    </ThemeProvider>
  )
}