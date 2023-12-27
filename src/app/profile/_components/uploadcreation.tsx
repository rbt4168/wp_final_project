import { main_theme } from "@/lib/themes";
import { Box, CssBaseline, Divider, Input, TextField, ThemeProvider, Typography } from "@mui/material";

export default function UploadCreation(props: any) {
  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        上傳作品
      </Typography>
        
      <Divider />

      <Box mx={5} my={3}>
        <Typography>作品名稱 Title</Typography>
        <Input
          id="name"
          placeholder="name"
          color="primary"
          sx={{width: "60%"}}
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
        />
      </Box>
        
    </ThemeProvider>
  )
}