"use client"
import GlobalChip from "@/components/chipglobal";
import CreatorHeader from "@/components/creatorheader";
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";
import { Box, CssBaseline, Divider, Grid, List, ListItem, ListItemButton, ThemeProvider, Typography } from "@mui/material";

function CostListItem(props: any) {
  const {text, cost} = props;
  return(
    <>
      <Divider />
      <ListItem disablePadding>
        <ListItemButton>
          <Box display="flex" justifyContent="space-between" sx={{width: "100%"}}>
            <GlobalChip text={text}/>
            <Typography color="inherit">
              {cost+" Coins"}
            </Typography>
          </Box>
        </ListItemButton>
      </ListItem>
    </>
  )
}

export default function DonatePage(props: any) {
  var tag_array=["嘎波 私人 Tire 1","嘎波 私人 Tire 2","嘎波 私人 Tire 3","嘎波 私人 Tire 4"];
  var cost_array=[50, 100, 150, 200];
  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <NavigationBar/>
      <CreatorHeader/>

      <DivLineCenter text="Private Tags"/>
      
      <Grid
        mt={3}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={7} md={7}>
          <List >
            {tag_array.map((e:any, id:any)=>(<CostListItem text={e} cost={cost_array[id]}/>))}
            <Divider />
          </List>
        </Grid>
      </Grid>

      

      <FooterComponent/>
    </ThemeProvider>
  )
}