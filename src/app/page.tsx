"use client"
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";
import { CssBaseline, Grid, Paper, TextField, ThemeProvider } from "@mui/material";

export default function Home() {
  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <NavigationBar/>

      <Grid
        mt={3}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={9} md={9}>
          <TextField
            id="search"
            placeholder="search"
            color="primary"
            size="small"
            sx={{width: "100%"}}
          />
        </Grid>
      </Grid>

      
      
      <DivLineCenter text="Followed Latest"/>




      <DivLineCenter text="Recent"/>
      <DivLineCenter text="Hot!"/>
      

      <FooterComponent/>
    </ThemeProvider>
  )
}
