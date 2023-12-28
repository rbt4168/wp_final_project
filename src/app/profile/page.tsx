"use client"
import FooterComponent from "@/components/footer"
import NavigationBar from "@/components/navbar"
import { main_theme } from "@/lib/themes"
import { Box, CssBaseline, Divider, Grid, ThemeProvider} from "@mui/material"

import Person2Icon from '@mui/icons-material/Person2';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import PublishIcon from '@mui/icons-material/Publish';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';

import SidebarComponent from "./_components/sidebar"
import UserProfile from "./_components/userprofile"
import { useEffect, useState } from "react"
import RecommandWork from "./_components/recommand"
import LikedWork from "./_components/likedwork"
import LikedCreator from "./_components/likedcreator"
import UploadCreation from "./_components/uploadcreation"
import ModifyCreation from "./_components/modifycreation"
import axios from "axios"
import Transactions from "./_components/txlists"
import TransactionCreat from "./_components/sendtransaction"
import PrivTagManange from "./_components/privatetagman"

export default function Profile() {
  const [ actionUser, setActionUser ] = useState({});
  const [ tirgger, setTrigger ] = useState(false);

  useEffect(()=>{
    axios.get("/api/getNowUser").then((e)=>{
      const event_user = e.data.user[0];
      setActionUser(event_user);
      console.log(actionUser);
    }).catch((e)=>{
      console.error(e);
    })
  }, [tirgger]);

  function trig() {
    setTrigger(!tirgger);
    setModifyID(0);
  }

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
      component: (<RecommandWork setModifyID={setModifyID} setSelectName={setSelectName} actionUser={actionUser} />)
    },
    {
      title: "上傳作品",
      icon: (<PublishIcon color="secondary"/>),
      component: (<UploadCreation />)
    },
    {
      title: "修改作品",
      icon: (<ModeEditIcon color="secondary"/>),
      component: (<ModifyCreation pic_id={modifyID} trigger={trig}/>),
    },
    {
      title: "交易紀錄",
      icon: (<AccountBalanceIcon color="secondary"/>),
      component: (<Transactions actionUser={actionUser}/>),
    },
    {
      title: "轉帳",
      icon: (<CurrencyExchangeIcon color="secondary"/>),
      component: (<TransactionCreat actionUser={actionUser} trigger={trig}/>),
    },
    {
      title: "標籤管理",
      icon: (<LocalOfferIcon color="secondary"/>),
      component: (<PrivTagManange actionUser={actionUser} trigger={trig}/>),
    },
    {
      title: "Divider"
    },
    {
      title: "喜歡的作品",
      icon: (<FavoriteIcon color="secondary"/>),
      component: (<LikedWork actionUser={actionUser}/>)
    },
    {
      title: "喜歡的創作者",
      icon: (<Diversity1Icon color="secondary"/>),
      component: (<LikedCreator actionUser={actionUser}/>)
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
                return (<Box key={id}>{e.component}</Box>);
              }
            })
          }
        </Grid>
      </Grid>
      <FooterComponent />
    </ThemeProvider>
  )
}