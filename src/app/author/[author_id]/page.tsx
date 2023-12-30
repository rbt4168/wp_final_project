"use client"

import { useEffect, useState } from "react";
import { Button, CssBaseline, Grid, IconButton, ListItemIcon, Menu, MenuItem, Typography } from "@mui/material";
import { ThemeProvider } from '@mui/material/styles';

import SortIcon from '@mui/icons-material/Sort';
import GradeIcon from '@mui/icons-material/Grade';
import FavoriteIcon from '@mui/icons-material/Favorite';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';

import CreatorHeader from "@/components/creatorheader";
import DivLineCenter, { DivLineCenterNoMt } from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { WorkCardComponent } from "@/components/workcomponent";

import { chunkArray, reverse_array } from "@/lib/utils";
import { main_theme } from "@/lib/themes"

import axios from "axios";

export default function AuthorPage(props: any) {
  const { params } = props;
  const { author_id } = params;

  const [ activeAuthor, setActiveAuthor ] = useState({
    name: "",
    quote: "",
    bio: "",
    links: "",
    works: [],
  })

  const [ recentArr, setRecentArr ] = useState([]);
  const [ recArr, setRecArr ] = useState([]);
  const [ popArr, setPopArr ] = useState([]);

  const [ basonArr, setBasonArr ] = useState([]);

  const [ latArr, setLatArr ] = useState([[]] as any[][]);
  const [ priArr, setPriArr ] = useState([[]] as any[][]);

  const [ firt, setFirt ] = useState("");
  const [ sect, setSect ] = useState("");

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  function handleClose() {
    setAnchorEl(null);
  }

  let option_list = [
    {
      title: "從新到舊排序",
      icon: (<KeyboardDoubleArrowDownIcon />),
      value: recentArr,
      first_text: "Latest 5 Works",
      second_text: "Previos Works",
    },
    {
      title: "從舊到新排序",
      icon: (<KeyboardDoubleArrowUpIcon />),
      value: reverse_array(recentArr),
      first_text: "Oldest 5 Works",
      second_text: "Newer",
    },
    {
      title: "最多人點讚",
      icon: (<FavoriteIcon />),
      value: popArr,
      first_text: "Most 5 Popular",
      second_text: "Populars",
    },
    {
      title: "作者推薦順序",
      icon: (<GradeIcon />),
      value: recArr,
      first_text: "Top 5 Recommand by Creator",
      second_text: "Others",
    },
  ]


  useEffect(()=>{
    setLatArr(chunkArray(basonArr, 5));
  }, [basonArr])

  function handleSort(id: number) {
    setBasonArr(option_list[id].value as never[]);
    setFirt(option_list[id].first_text);
    setSect(option_list[id].second_text);
  }

  useEffect(()=>{
    axios.get("/api/getAuthorById?user_id="+author_id).then((e)=>{
      setActiveAuthor(e.data);
    }).catch((e)=>console.error(e));

    const payload = {
      author_id: author_id
    }

    axios.post("/api/authorHighToLow", payload).then((e)=>{
      setRecentArr(e.data.pictureIds);
      
      setBasonArr(e.data.pictureIds);
      setFirt(option_list[0].first_text);
      setSect(option_list[0].second_text);
      // setLatArr(chunkArray(e.data.pictureIds, 5));
    }).catch((e)=>console.error(e));

    axios.post("/api/authorRecommand", payload).then((e)=>{
      setRecArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));

    axios.post("/api/authorPopular", payload).then((e)=>{
      setPopArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));
    
    axios.post("/api/authorTag", payload).then((e)=>{
      setPriArr(chunkArray(e.data.pictureIds, 5));
    }).catch((e)=>console.error(e));
    /*
    axios.post("/api/authorRecommand", payload).then((e)=>{
      setRecArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));

    axios.post("/api/authorRecommand", payload).then((e)=>{
      setRecArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));

    axios.post("/api/authorRecommand", payload).then((e)=>{
      setRecArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));

    axios.post("/api/authorRecommand", payload).then((e)=>{
      setRecArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));

    axios.post("/api/authorRecommand", payload).then((e)=>{
      setRecArr(e.data.pictureIds);
    }).catch((e)=>console.error(e));
*/
  }, [])

  return(
  <ThemeProvider theme={main_theme}>
    <CssBaseline />
    <NavigationBar />

    <CreatorHeader activeAuthor={activeAuthor} setActiveAuthor={setActiveAuthor} authorId={author_id}/>


    <Grid container 
      justifyContent="center"
      alignItems="center"
      mt={2}
    >
      <Button href={"/donate/"+author_id} component="a" variant="contained"
        sx={{width: "40%"}}>
        Sponsor Creator
      </Button>
    </Grid>
    
    
    {priArr.length >= 1 ? (
    <>
      <DivLineCenter text="Private Works"/>
      {
        priArr.map((e0:any[],idx:any)=>{
          return(
            <Grid key={idx} container 
              justifyContent="center"
              alignItems="center"
            >
              {e0.map((e:any, id:any)=>{
                return(
                <Grid key={id} item xs={12} md={2}>
                  <WorkCardComponent pic_id={e} />
                </Grid>
                )
              })}
            </Grid>
          )
        })
      }
    </>
    ) : (<></>) }

    <DivLineCenter text="Top 3 Recommanded by Author"/>
    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      {recArr.map((e:any, id:any)=>{
        if(id>=3) return(<></>);
        return(
        <Grid key={id} item xs={12} md={3}>
          <WorkCardComponent pic_id={e} />
        </Grid>
        )
      })}
    </Grid>

    
    
    <Grid container 
      justifyContent="center"
      alignItems="right"
    >
      <Grid item xs={9} md={9} textAlign="right" alignItems="right">
        <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? 'long-menu' : undefined}
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
          >
          <SortIcon />
        </IconButton>
      </Grid>
    </Grid>

    <DivLineCenter text={firt}/>
    <Grid container 
      justifyContent="center"
      alignItems="center"
    >
      {latArr.length > 0 ? (latArr[0].map((e:any, id:any)=>{
        if(id>=5) return(<></>);
        return(
        <Grid key={id} item xs={12} md={2}>
          <WorkCardComponent pic_id={e} />
        </Grid>
        )
      })):(<></>)}
    </Grid>

    {latArr.length >= 1 ? (
    <>
      <DivLineCenterNoMt text={sect}/>
      {
        latArr.map((e0:any[],idx:any)=>{
          if(idx===0) return(<></>)
          return(
            <Grid key={idx} container 
              justifyContent="center"
              alignItems="center"
            >
              {e0.map((e:any, id:any)=>{
                return(
                <Grid key={id} item xs={12} md={2}>
                  <WorkCardComponent pic_id={e} />
                </Grid>
                )
              })}
            </Grid>
          )
        })
      }
    </>
    ) : (<></>) }

    <Menu
      id="long-menu"
      MenuListProps={{
        'aria-labelledby': 'long-button',
      }}
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      PaperProps={{
        style: {
          maxHeight: 30 * 4.5,
          width: '20ch',
        },
      }}
    >
      {option_list.map((option: any, idx:number) => (
        <MenuItem key={option} selected={option === 'Pyxis'} onClick={()=>handleSort(idx)}>
          <ListItemIcon>
            {option.icon}
          </ListItemIcon>
          <Typography variant="inherit" noWrap>
            {option.title}
          </Typography>
        </MenuItem>
      ))}
    </Menu>
    

    <FooterComponent/>
  </ThemeProvider>
  )
}