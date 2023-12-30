"use client"

import { useEffect, useState } from "react";
import { Box, CssBaseline, Divider, Typography,
  List, ListItem, ListItemButton, ListItemIcon, ListItemText, Input, Grid, Button} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import { main_theme } from "@/lib/themes";

import axios from "axios";

// import PusherClient from "pusher-js";
// import { NEXT_PUBLIC_PUSHER_CLUSTER, NEXT_PUBLIC_PUSHER_KEY } from "@/lib/utils";

// export const pusherClient = new PusherClient(NEXT_PUBLIC_PUSHER_KEY, {
//   cluster: NEXT_PUBLIC_PUSHER_CLUSTER,
// });

// function AuthorItem(props: any) {
//     const {item, username} = props;

//     return (
//       <>
//         <Divider />
//         <ListItem disablePadding>
//         <ListItemButton>
//             <ListItemIcon>
//             <Box
//                 component="img"
//                 sx={{
//                   height: 50,
//                   width: 50,
//                   border: "1px solid",
//                   borderRadius: "50%"
//                 }}
//                 alt="UImg"
//                 src="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
//             />
//             </ListItemIcon>
//             <ListItemText primary={username} secondary={"message"} />   
//         </ListItemButton>
//         </ListItem>
//       </>
//     )
// }

// function MessageItems(props: any) {
//   const {item, left} = props;

//   return (
//     <>
//       <ListItem sx={{ width: "100%" }}>
//         <Typography variant="body2" align={left?"left":"right"} sx={{ width: "100%"  }}>
//           {item}
//         </Typography>
//       </ListItem>
//     </>
//   )
// }

// function MessagesContainer(props: any) {
//   const [ msgs, setMsgs ] = useState([]);

//   useEffect(()=>{
//     axios.post("/api/gmsg", {cid: cid}).then((res)=>{
//       setMsgs(JSON.parse(res.data.message));
//     }).catch((e)=>console.error(e));

//     const channel = pusherClient.subscribe(`ch_${cid}`);

//     pusherClient.connection.bind("state_change", function (states) {
//       if(states.current === "disconnected") {
//         pusherClient.connect();
//       }
//     });

//     channel.bind("evt", data => {
//       console.log(data);
//       axios.post("/api/gmsg", {cid: cid}).then((res)=>{
//         setMsgs(JSON.parse(res.data.message));
//       }).catch((e)=>console.error(e));
//     });

//     return ()=>{
//       pusherClient.unsubscribe(`ch_${cid}`);
//     }
//   }, [ cid ]);

//   // useEffect(()=>{
//   //   let scroll_ele = document.getElementById("mxmsg");
//   //   scroll_ele.scrollTop = scroll_ele.scrollHeight? scroll_ele.scrollHeight: 0;
//   // },[ msgs ])

//   return  (<></>);
// }

// function SideBar(props: any) {
//   const {user, setCid, setOppo, oppouid, setOppouid} = props;

//   const [oppos, setOppos] = useState([]);

//   useEffect(()=>{
//     axios.post("/api/chats", {uid: user.uid}).then((res)=>{
//       let iuser = JSON.parse(res.data.message);
//       console.log(iuser);
//       setOppos(iuser);
//     }).catch((e)=>console.error(e));

//     const channel = pusherClient.subscribe(`ch_${user.uid}`);

//     pusherClient.connection.bind("state_change", function (states:any) {
//       if(states.current === "disconnected") {
//         pusherClient.connect();
//       }
//     });

//     channel.bind("evt", (data:any) => {
//       console.log(data);
//       axios.post("/api/chats", {uid: user.uid}).then((res)=>{
//         let iuser = JSON.parse(res.data.message);
//         console.log(iuser);
//         setOppos(iuser);
//       }).catch((e)=>console.error(e));
//     });

//     return ()=>{
//       pusherClient.unsubscribe(`ch_${user.uid}`);
//     }

//   }, [user])

//   return (
//     <List sx={{width: "30%" , height: "80vh", overflow: "scroll"}} >
//       {[1,2,3,4,5,6,7,8,9,10,11,12,13].map((e: any, index:any) => (
//         <AuthorItem key={index} item={e} username={actionUser.username}/>
//       ))}
//       <Divider />
//     </List>
//   )
// }

// function ChatView(props: any) {
//   const [ text, setText ] = useState("");

//   return (
//     <Box sx={{ width: "70%", height: "80vh" }}>
//       <List sx={{width: "100%", height: "100%"}}>
//         {[1,2,3,4,5].map((e: any, index:any) => (
//           <MessageItems key={index} item={e} left={e%2}/>
//         ))}
//       </List>
//       <Box bottom="0px" sx={{ width: "100%" }}>
//         <Grid container>
//           <Grid item md={1}>

//           </Grid>
//           <Grid item md={10}>
//             <Input
//               id="text"
//               placeholder="type something..."
//               color="primary"
//               sx={{width: "100%"}}
//               value={text}
//               onChange={(e:any)=>setText(e.target.value)}
//             />
//           </Grid>
//           <Grid item md={1}>
//             <Button component="a" color="secondary" variant="contained" sx={{ my: 1, mx: 1.5 }}>
//               Send
//             </Button>
//           </Grid>
//         </Grid>
//       </Box>
//     </Box>
//   )
// }

import HomeAA from "./_messagecom/homex";

export default function MessageSystem(props: any) {
  const { actionUser } = props;

  return (
    <ThemeProvider theme={main_theme}>
      <CssBaseline />
      <Typography component="h1" variant="h5" m={3} sx={{ fontWeight: 600 }}>
        私訊 Message
      </Typography>
      <Divider />

      <Box height="100vh" display="flex">
        <HomeAA username={actionUser.username}/>
      </Box>
      <Divider orientation="vertical" flexItem/>
    </ThemeProvider>
  )
}