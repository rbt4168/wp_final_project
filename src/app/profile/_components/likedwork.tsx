"use client"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, Grid, ThemeProvider, Typography } from "@mui/material"
import { WorkCardComponent } from "@/components/workcomponent";

export default function LikedWork(props: any) {
  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        喜歡的作品 Liked
      </Typography>
      <Divider />
      <Box mx={5} my={3}>
        <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(40)).map((_, index) => (
            <Grid item xs={4} sm={2} md={3} key={index}>
              <WorkCardComponent pic_id={0} />
            </Grid>
          ))}
        </Grid>
      </Box>
      
    </ThemeProvider>
  )
}