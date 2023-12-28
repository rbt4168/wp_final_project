import { Box, Grid, ListItem, ListItemButton, Typography } from "@mui/material";

export function RelatedWorkListItem(props: any) {
    const { pic_id } = props;
    // TODO complete backend

    return (
      <ListItem disablePadding>
      <ListItemButton onClick={()=>{}}>
      <Grid container spacing={2}>
        <Grid item>
          <Box
              component="img"
              sx={{
                height: 128,
                width: 128,
              }}
              alt="a"
              src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                嘎波啵啵~
              </Typography>
              <Typography gutterBottom variant="body2" component="div" color="primary">
                創作者嘎波
              </Typography>
              <Typography variant="body2" gutterBottom>
                ID: 13794058
              </Typography>
              <Typography variant="body2" color="text.secondary">
                2023-03-05
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </ListItemButton>
      </ListItem>
    );
  }