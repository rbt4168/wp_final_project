"use client"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, ThemeProvider,
    Typography, List} from "@mui/material"
import { DivLineCenterFull } from "@/components/divline";
import { ArtWorkListItem } from "@/components/workcomponent";


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
            <ArtWorkListItem key={index} pic_id={pic_id} setid={setModifyID} redir={setSelectName}/>
          ))}
          {/* <DivLineCenterFull text="2023-11"/>
          {Array.from(Array(1)).map((_, index) => (
            <ArtWorkListItem
              small_url="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
              name={"嘎波的作品"+Math.random()} idx="18515" like_count={123}
              rec_point={Math.floor(Math.random()*10)} setid={setModifyID} redir={setSelectName}
            />))}
          <DivLineCenterFull text="2023-10"/>
          {Array.from(Array(1)).map((_, index) => (
            <ArtWorkListItem
              small_url="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
              name={"嘎波的作品"+Math.random()} idx="18515" like_count={123}
              rec_point={Math.floor(Math.random()*10)} setid={setModifyID} redir={setSelectName}
            />))} */}
        </List>
      </Box>
      
    </ThemeProvider>
  )
}