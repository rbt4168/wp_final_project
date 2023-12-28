"use client"
import FooterComponent from "@/components/footer"
import NavigationBar from "@/components/navbar"
import { main_theme } from "@/lib/themes"
import { CssBaseline, Divider, Grid, ThemeProvider} from "@mui/material"

import Person2Icon from '@mui/icons-material/Person2';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PublishIcon from '@mui/icons-material/Publish';
import ModeEditIcon from '@mui/icons-material/ModeEdit';

import SidebarComponent from "./_components/sidebar"
import UserProfile from "./_components/userprofile"
import { useEffect, useState } from "react"
import RecommandWork from "./_components/recommand"
import LikedWork from "./_components/likedwork"
import LikedCreator from "./_components/likedcreator"
import UploadCreation from "./_components/uploadcreation"
import ModifyCreation from "./_components/modifycreation"
import axios from "axios"

export default function Profile() {
  const [ actionUser, setActionUser ] = useState({});
  const [ tirgger, setTrigger ] = useState(false);

  useEffect(()=>{
    axios.get("/api/getNowUser").then((e)=>{
      let event_user = e.data.user[0];
      setActionUser(event_user);
      console.log(actionUser);
    }).catch((e)=>{
      console.error(e);
    })
  }, [tirgger]);

  function trig() {
    setTrigger(!tirgger);
  }

  // useEffect(()=>{
  //   setTrigger(!tirgger);
  // }, [])

  const [ modifyID, setModifyID ] = useState(0);
  const [ selectName, setSelectName ] = useState("帳號資料");
  const list_items = [
    {
      title: "帳號資料",
      icon: (<Person2Icon color="secondary"/>),
      component: (<UserProfile actionUser={actionUser} trigger={trig}/>)
    },
    {
      title: "作品管理",
      icon: (<ColorLensIcon color="secondary"/>),
      component: (<RecommandWork setModifyID={setModifyID} setSelectName={setSelectName}/>)
    },
    {
      title: "上傳作品",
      icon: (<PublishIcon color="secondary"/>),
      component: (<UploadCreation />)
    },
    {
      title: "修改作品",
      icon: (<ModeEditIcon color="secondary"/>),
      component: (<ModifyCreation pic_id={modifyID}/>),
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

  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <NavigationBar />
      <Grid container component="main">
        <Grid item xs={5} sm={4} md={2}>
          <SidebarComponent selectName={selectName} setSelectName={setSelectName} listItmes={list_items} actionUser={actionUser}/>
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