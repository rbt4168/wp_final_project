"use client"

import { Box, CssBaseline, Divider, Typography, List} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { DivLineCenterFull } from "@/components/divline";
import { ArtWorkListItem } from "@/components/workcomponent";

import { main_theme } from "@/lib/themes"

export default function RecommandWork(props: any) {
  const { setModifyID, setSelectName, actionUser } = props;

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        作品管理 Artworks
      </Typography>
      <Divider />

      <Box>
        <List>
          <DivLineCenterFull text="Recent"/>
          {actionUser?.post_picture?.map((pic_id: any, index:any) => (
            <ArtWorkListItem key={index} pic_id={pic_id}
              setid={setModifyID} redir={setSelectName}
            />
          ))}
        </List>
      </Box>
    </ThemeProvider>
  )
}