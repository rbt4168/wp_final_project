"use client"
import NavigationBar from "@/components/navbar"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, List, ListItem,
         ListItemButton, ListItemIcon, ListItemText,
         ThemeProvider} from "@mui/material"

import Person2Icon from '@mui/icons-material/Person2';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import { useState } from "react"

const private_items = [
  {
    title: "帳號資料",
    icon: (<Person2Icon />),
  },
  {
    title: "作品管理",
    icon: (<ColorLensIcon />)
  }
]

const liked_items = [
  {
    title: "喜歡的作品",
    icon: (<FavoriteIcon />)
  },
  {
    title: "喜歡的創作者",
    icon: (<Diversity1Icon />)
  }
]
export default function SidebarComponent(props: any) {
  const { selectName, setSelectName, listItmes } = props;

  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <List>
      <ListItem>
          <ListItemIcon>
          <Box
              component="img"
              sx={{
                height: 50,
                width: 50,
                border: "1px solid",
                borderRadius: "50%"
              }}
              alt="The house from the offer."
              src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
          />
          </ListItemIcon>
          <ListItemText primary={"我操，我是嘎波"} secondary={"早安~"} />
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