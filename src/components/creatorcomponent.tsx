import { Box, Grid, ListItem, ListItemButton, Typography } from "@mui/material";
export function CreatorListItem(props: any) {
    const { user_id } = props;
    // TODO: add backend

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
                border: "1px solid",
                borderRadius: "30px"
              }}
              alt="a"
              src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
          />
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div" color="primary">
                創作者嘎波
              </Typography>
              <Typography variant="body2" gutterBottom>
                好喜歡和大家玩的~~
              </Typography>
              <Typography variant="body2" color="text.secondary">
                account: cappo
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      </ListItemButton>
      </ListItem>
    );
  }