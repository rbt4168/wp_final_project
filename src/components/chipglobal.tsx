import { main_theme } from "@/lib/themes";
import { Chip, CssBaseline, ThemeProvider } from "@mui/material";

export default function GlobalChip(props: any) {
    const { text } = props;
    return(
        <ThemeProvider theme={main_theme}>
            <CssBaseline/>
            <Chip variant="outlined" color="primary" label={text} sx={{bgcolor: 
                text.includes("private")?"#FADBE5":"#FBF8CC"}}/>
        </ThemeProvider>
    )
}

export function GlobalChipSmall(props: any) {
    const { text } = props;
    return(
        <ThemeProvider theme={main_theme}>
            <CssBaseline/>
            <Chip variant="outlined" color="primary" size="small" label={text} sx={{ bgcolor:
               text.includes("private")?"#FADBE5":"#FBF8CC" }}/>
        </ThemeProvider>
    )
}