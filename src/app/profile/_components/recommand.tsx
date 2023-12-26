"use client"
import { main_theme } from "@/lib/themes"
import { Box, Card, CardMedia, CardContent, CssBaseline, Divider, Grid, ThemeProvider, Typography, CardActions, Button, Hidden, CardActionArea, styled, Rating } from "@mui/material"

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#ff6d75',
  },
  '& .MuiRating-iconHover': {
    color: '#ff3d47',
  },
});
function WorkCard(props: any) {
  return (
    <Card sx={{ maxWidth: "100%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          image="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Lizard
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
      
      <CardActions sx={{ justifyContent: "space-between" }}>
        <Button size="large" color="primary" sx={{ fontWeight: 800 }}>分享</Button>
        <StyledRating
          name="customized-color"
          defaultValue={0}
          getLabelText={(value: number) => `${value} Heart${value !== 1 ? 's' : ''}`}
          icon={<FavoriteIcon fontSize="inherit" />}
          emptyIcon={<FavoriteBorderIcon fontSize="inherit" />}
        />
        <Button size="large" color="secondary" sx={{ fontWeight: 800 }}>刪除</Button>
      </CardActions>
    </Card>
  );
}
export default function RecommandWork(props: any) {
  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        作品管理 Artworks
      </Typography>
      <Divider />
      <Box mx={5} my={3}>
        <Grid container spacing={{ xs: 2, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }}>
          {Array.from(Array(40)).map((_, index) => (
            <Grid item xs={4} sm={2} md={4} key={index}>
              <WorkCard />
            </Grid>
          ))}
        </Grid>
      </Box>
      
    </ThemeProvider>
  )
}