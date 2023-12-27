"use client"
import { main_theme } from "@/lib/themes";
import { Box, Button, CssBaseline, Grid, Link, Paper, ThemeProvider, Typography } from "@mui/material";


export default function CreatorHeader(props: any) {
  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <Paper sx={{
          position: 'relative',
          backgroundColor: 'grey.800',
          color: '#fff',
          mb: 4,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          // height: "60vh",
          paddingTop: "100px",
          paddingBottom: "100px",
          backgroundImage: `url(https://source.unsplash.com/random?wallpapers)`,
        }}
      >
        <Box>
          <Typography display="flex" justifyContent="center" alignItems="center"
            component="h1" variant="h3" color="inherit"
            sx={{fontSize:"85px", width: "100%"}} gutterBottom
          >          
            我是嘎波
          </Typography>
          
          <Box display="flex" justifyContent="center" alignItems="center">
            <Box component="img"
              sx={{
                height: "10%",
                width: "10%",
                border: "1px solid",
                borderRadius: "50%"
              }}
              alt="The house from the offer."
              src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
            />
          </Box>
          
          <Typography display="flex" justifyContent="center" alignItems="center"
            component="h2" variant="h4" color="inherit"
            sx={{width: "100%"}} mt={3} gutterBottom
          >
            「勇敢面對，智慧引領。」
          </Typography>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Button
              color="primary" variant="contained"
            >
              Follow
            </Button>
          </Box>
        </Box>
      </Paper>
      <Grid container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={9} md={9}>
        <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
          <Typography variant="h6" gutterBottom>
            關於我:
          </Typography>
          <Typography>
            大家好，我是嘎波，一位充滿好奇心和熱情的青年。我來自台北市，畢業於國立台灣大學，主修資訊工程。我的專業技能包括程式設計、數據分析和網路安全。同時，我對攝影、音樂和旅行也有濃厚的興趣，這些豐富的經歷讓我在不同領域都能有所表現。在學業之外，我經常參與社區服務，擔任志工工作。這不僅讓我有機會貢獻社會，還與各種背景的人建立了深厚的人際關係。我的性格樂觀積極，喜歡挑戰自己，樂於與他人合作。未來，我期望在資訊科技領域中取得更大的成就，同時保持對新事物的好奇心，持續學習和成長。感謝你了解我，期待與你分享更多故事和經歷。
          </Typography >
        </Paper>
      </Grid>
    </Grid>
    <Grid container
      justifyContent="center"
      alignItems="center"
    >
      <Grid item xs={9} md={9}>
        <Grid container>
          <Grid item xs={3}>
            <Link href="#" variant="body2">
              Link1
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link href="#" variant="body2">
              Link2
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link href="#" variant="body2">
              Link3
            </Link>
          </Grid>
          <Grid item xs={3}>
            <Link href="#" variant="body2">
              Link4
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
    </ThemeProvider>
  )
}