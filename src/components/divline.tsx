import { main_theme } from "@/lib/themes";
import { CssBaseline, Divider, Grid, ThemeProvider } from "@mui/material";

export default function DivLineCenter(props:any) {
  const { text } = props;
  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Grid
        mt={3}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={9} md={9}>
          <Divider>{text}</Divider>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}