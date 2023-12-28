"use client"
import { main_theme } from "@/lib/themes"
import { Box, Button, CssBaseline, Divider, Input, TextField, ThemeProvider, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import axios from "axios"
// import axios from "axios";
// import { useRouter } from "next/navigation";
export default function UserProfile(props: any) {

  const [name, setName] = useState("");
  const [quote, setQuote] = useState("");
  const [title, setTitle] = useState("");
  const [bio, setBio] = useState("");

  const [link0, setLink0] = useState("");
  const [link1, setLink1] = useState("");
  const [link2, setLink2] = useState("");
  const [link3, setLink3] = useState("");

  useEffect(()=>{
    axios.get("/api/getNowUser").then((e)=>{
      let event_user=e.data.user[0]
      setName(event_user.name);
      setQuote(event_user.quote);
      setTitle(event_user.title);
      setBio(event_user.bio);
      let linkx = event_user.links.split(",");
      if(linkx.length > 0) {
        setLink0(linkx[0]);
      }
      if(linkx.length > 1) {
        setLink1(linkx[1]);
      }
      if(linkx.length > 2) {
        setLink2(linkx[2]);
      }
      if(linkx.length > 3) {
        setLink3(linkx[3]);
      }
    }).catch((e)=>{
      console.error(e);
    })
  }, []);

  const handleSubmit = (e: any) => {
    // TODO: Update User Profile
    const links = [link0, link1, link2, link3].join(",");

    const payload = {
      name: name,
      quote: quote,
      title: title,
      bio: bio,
      links: links
    };
  
    // Make the API call
    axios.post("/api/userprofile", payload)
      .then(response => {
        alert("success");
      }).catch((e) => {
        // Handle error
        alert("Error occurred while updating profile");
      });

  };

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        帳號資料 Account
      </Typography>
      
      <Divider />
      <Box mx={5} my={3}>
        <Typography>名稱</Typography>
        <Input
          id="name"
          placeholder="name"
          color="primary"
          sx={{width: "60%"}}
          value={name}
          onChange={(e:any)=>setName(e.target.value)}
        />
      </Box>
      <Box mx={5} my={3}>
        <Typography>座右銘</Typography>
        <Input
          id="quote"
          placeholder="quote"
          color="primary"
          sx={{width: "60%"}}
          value={quote}
          onChange={(e:any)=>setQuote(e.target.value)}
        />
      </Box>
      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
        <Typography>稱謂</Typography>
        <Input
          id="title"
          placeholder="title"
          color="primary"
          sx={{width: "60%"}}
          value={title}
          onChange={(e:any)=>setTitle(e.target.value)}
        />
      </Box>
      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
        <Typography>小屋介紹</Typography>
        <TextField
          placeholder="介紹一下吧！"
          color="primary"
          multiline
          rows={5}
          sx={{width: "60%"}}
          value={bio}
          onChange={(e:any)=>setBio(e.target.value)}
        />
      </Box>
      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}} >
        <Typography>其他連結</Typography>
        <TextField
          id="link0"
          placeholder="link0"
          color="primary"
          size="small"
          sx={{width: "60%"}}
          value={link0}
          onChange={(e:any)=>setLink0(e.target.value)}
        />
        <TextField
          id="link1"
          placeholder="link1"
          color="primary"
          size="small"
          sx={{width: "60%"}}
          value={link1}
          onChange={(e:any)=>setLink1(e.target.value)}
        />
        <TextField
          id="link2"
          placeholder="link2"
          color="primary"
          size="small"
          sx={{width: "60%"}}
          value={link2}
          onChange={(e:any)=>setLink2(e.target.value)}
        />
        <TextField
          id="link3"
          placeholder="link3"
          color="primary"
          size="small"
          sx={{width: "60%"}}
          value={link3}
          onChange={(e:any)=>setLink3(e.target.value)}
        />
        
      </Box>
      <Box mx={5} my={3} sx={{ typography: 'subtitle2'}}>
        <Button
          type="submit"
          fullWidth
          variant="outlined"
          onClick={handleSubmit}
          sx={{width: "60%"}}
        >
          修改資料 Modify
        </Button>
      </Box>
    </ThemeProvider>
  )
}