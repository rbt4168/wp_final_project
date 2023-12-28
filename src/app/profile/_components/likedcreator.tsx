"use client"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, ThemeProvider, Typography, List } from "@mui/material"

import { CreatorListItem } from "@/components/creatorcomponent";
export default function LikedCreator(props: any) {
  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        喜歡的創作者 Creators
      </Typography>
      <Divider />
      <Box>
        <List>
          {Array.from(Array(40)).map((_, index) => (
            <CreatorListItem key={index} user_id={0} />
          ))}
        </List>
      </Box>
    </ThemeProvider>
  )
}