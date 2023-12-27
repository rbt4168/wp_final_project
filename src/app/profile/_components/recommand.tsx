"use client"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, Grid, ThemeProvider,
    Typography, List, ListItem, ListItemButton } from "@mui/material"
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { DivLineCenterFull } from "@/components/divline";
import { StyledRating } from "@/components/styledcomps";

function ArtWorkListItem(props: any) {
  const { small_url, name, idx, like_count, rec_point, setid, redir } = props;
  return (
    <ListItem disablePadding>
    <ListItemButton onClick={()=>{ setid(idx); redir("修改作品");}}>
      <Grid container spacing={2}>
        <Grid item>
          <Box
              component="img"
              sx={{
                height: 128,
                width: 128,
              }}
              alt="a"
              src={small_url}
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                {name}
              </Typography>
              <Typography variant="body2" gutterBottom>
                ID: {idx}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {like_count} <FavoriteIcon color="secondary" />
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <StyledRating
                  name="customized-color"
                  readOnly
                  defaultValue={rec_point}
                  max={10}
                  getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
                  icon={<FavoriteIcon fontSize="inherit" />}
                  emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ListItemButton>
    </ListItem>
  );
}

export default function RecommandWork(props: any) {
  const { setModifyID, setSelectName } = props;
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
          {Array.from(Array(2)).map((_, index) => (
            <ArtWorkListItem
              small_url="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
              name={"嘎波的作品"+Math.random()} idx="18515" like_count={123}
              rec_point={Math.floor(Math.random()*10)} setid={setModifyID} redir={setSelectName}
            />))}
          <DivLineCenterFull text="2023-11"/>
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
            />))}
        </List>
      </Box>
      
    </ThemeProvider>
  )
}