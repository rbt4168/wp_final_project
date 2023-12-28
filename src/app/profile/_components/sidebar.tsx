"use client"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, List, ListItem,
         ListItemButton, ListItemIcon, ListItemText,
         ThemeProvider} from "@mui/material"

export default function SidebarComponent(props: any) {
  const { selectName, setSelectName, listItmes, actionUser } = props;

  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <List>
      <ListItem disablePadding>
      <ListItemButton href={"/author/"+actionUser.id}>
          <ListItemIcon>
          <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                border: "1px solid",
                borderRadius: "50%"
              }}
              alt="UImg"
              src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
          />
          </ListItemIcon>
          <ListItemText primary={actionUser.name} secondary={actionUser.quote} />   
      </ListItemButton>
      </ListItem>
      </List>
      <Divider />
      <List>
      {listItmes.map((e:any, id:any)=>{
          if(e.title === "Divider") {
            return (<Divider key={id} />)
          }
          return(
              <ListItem disablePadding key={id}>
                <ListItemButton
                    onClick={() => setSelectName(e.title)}
                    selected={selectName === e.title}
                >
                    <ListItemIcon>
                      {e.icon}
                    </ListItemIcon>
                    <ListItemText primary={e.title} />
                </ListItemButton>
              </ListItem>
          )
        })
      }
      </List>
    </ThemeProvider>
  )
}