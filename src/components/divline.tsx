import { main_theme } from "@/lib/themes";
import { CssBaseline, Divider, Grid, ThemeProvider } from "@mui/material";

interface div_props {
  text: string
}

export default function DivLineCenter(props: div_props) {
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
export function DivLineCenterNoMt(props: div_props) {
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

export function DivLineCenterFull(props: div_props) {
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