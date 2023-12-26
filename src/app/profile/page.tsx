"use client"
import FooterComponent from "@/components/footer"
import NavigationBar from "@/components/navbar"
import { main_theme } from "@/lib/themes"
import { CssBaseline, Divider, Grid, ThemeProvider} from "@mui/material"

import Person2Icon from '@mui/icons-material/Person2';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Diversity1Icon from '@mui/icons-material/Diversity1';

import SidebarComponent from "./_components/sidebar"
import UserProfile from "./_components/userprofile"
import { useState } from "react"
import RecommandWork from "./_components/recommand"
import LikedWork from "./_components/likedwork"
import LikedCreator from "./_components/likedcreator"

const list_items = [
  {
    title: "帳號資料",
    icon: (<Person2Icon color="secondary"/>),
    component: (<UserProfile />)
  },
  {
    title: "作品管理",
    icon: (<ColorLensIcon color="secondary"/>),
    component: (<RecommandWork />)
  },
  {
    title: "Divider"
  },
  {
    title: "喜歡的作品",
    icon: (<FavoriteIcon color="secondary"/>),
    component: (<LikedWork />)
  },
  {
    title: "喜歡的創作者",
    icon: (<Diversity1Icon color="secondary"/>),
    component: (<LikedCreator/>)
  }
];
export default function Profile() {
  const [ selectName, setSelectName ] = useState("帳號資料");
  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <NavigationBar />
      <Grid container component="main">
        <Grid item xs={5} sm={4} md={2}>
          <SidebarComponent selectName={selectName} setSelectName={setSelectName} listItmes={list_items}/>
        </Grid>
        <Divider orientation="vertical" flexItem />
        <Grid item xs={7} sm={8} md={9}>
          {list_items.map((e:any,id:any)=>{
              if(e.title === selectName) {
                return e.component;
              }
            })
          }
        </Grid>
      </Grid>
      <FooterComponent />
    </ThemeProvider>
  )
}