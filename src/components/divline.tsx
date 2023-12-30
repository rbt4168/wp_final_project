import { main_theme } from "@/lib/themes";
import { CssBaseline, Divider, Grid, ThemeProvider } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

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
export function DivLineCenterNoMt(props:any) {
  const { text } = props;
  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Grid
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

export function DivLineCenterFull(props:any) {
  const { text } = props;
  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={12}>
          <Divider textAlign="right">{text}</Divider>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}