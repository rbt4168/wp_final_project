"use client"

import { Box, CssBaseline, Divider, Typography} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { main_theme } from "@/lib/themes";

import HomeAA from "./_messagecom/homex";

export default function MessageSystem(props: any) {
  const { actionUser, trigger } = props;

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        私訊 Message
      </Typography>
      <Divider />

      <Box height="100vh" display="flex">
        <HomeAA username={actionUser.username} trigger={trigger}/>
      </Box>
      <Divider orientation="vertical" flexItem/>
    </ThemeProvider>
  )
}