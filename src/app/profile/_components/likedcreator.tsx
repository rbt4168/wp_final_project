"use client"

import { Box, CssBaseline, Divider, Typography, List } from "@mui/material"
import { ThemeProvider } from "@mui/material/styles";

import { CreatorListItem } from "@/components/creatorcomponent";

import { main_theme } from "@/lib/themes";

export default function LikedCreator(props: any) {
  const { actionUser } = props;

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        喜歡的創作者 Creators
      </Typography>
      <Divider />
      <Box>
        <List>
          {actionUser.liked_user?.map((user_id:any, index:any) => (
            <CreatorListItem key={index} user_id={user_id} />
          ))}
        </List>
      </Box>
    </ThemeProvider>
  )
}