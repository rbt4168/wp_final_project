"use client"
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";
import { CssBaseline, Grid, Paper, TextField, ThemeProvider, Button } from "@mui/material";
import axios from "axios"
export default function Home() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: sign in logic
    axios.post("/api/userprofile", {}).then().catch(() => alert("你到底做什麼 解釋一下"))
    
  };
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
