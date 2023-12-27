"use client"
import GlobalChip from "@/components/chipglobal";
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";
import { dnd_handler } from "@/lib/utils";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CssBaseline, Divider, Grid, IconButton, List, ListItem, TextField, ThemeProvider, Typography } from "@mui/material";
import { useState } from "react";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

function DragComponent(props:any) {
  const { cid, idx, text } = props;
  return(
    <Draggable key={"dg"+cid} draggableId={"dg"+cid}
      index={idx}
    >
      {(provided, snapshot) => (
        // <div
        //   ref={provided.innerRef}
        //   {...provided.draggableProps}
        //   {...provided.dragHandleProps}
        // >
        <>
          <ListItem disablePadding ref={provided.innerRef}
            sx={{ width: "100%" }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}>
            <Box sx={{ width: "100%" }} display="flex"
              justifyContent="space-between"
              alignItems="center">
              <Typography>
                <GlobalChip text={text}/>
              </Typography>
              <Typography>
                {
                  Math.random() > 0.5 ? (<CloseIcon color="secondary"/>) : (<CheckIcon color="primary"/>)
                }
              </Typography>
              
            </Box>
          </ListItem>
          <Divider />
        </>
        // </div>
      )}
    </Draggable>
  )
}

function RecWorkCard(props: any) {
  const [onliked, setonliked] = useState(true);
  return (
    <Box sx={{margin: "30px"}}>
      <Card sx={{ maxWidth: "100%" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image="https://upload.wikimedia.org/wikipedia/en/8/88/Bugcat_Capoo.jpg"
          />
        </CardActionArea>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ maxWidth:'100%', display: "flex", justifyContent:"space-between" }}>
            <Box>
              Lizard
            </Box>
            <IconButton aria-label="fingerprint" color="secondary" onClick={()=>setonliked(!onliked)}>
              {onliked?(<FavoriteIcon />):(<FavoriteBorderIcon/>) }
            </IconButton>
          </Typography>
        </CardContent>
        <CardActions>
          <Typography variant="body2">
            ID: 168598
          </Typography>
        </CardActions>
      </Card>
    </Box>
  );
}

export default function SearchPage(props: any) {
  const [ stateList, setStateList ] = useState([
    {
      id: '1',
      text: 'Robin',
    },
    {
      id: '2',
      text: 'Aiden',
    },
    {
      id: '3',
      text: 'Jannet',
    },
  ])
  return(
    <ThemeProvider theme={main_theme}>
      <CssBaseline/>
      <NavigationBar/>
      <Grid
        mt={3}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={9} md={9} alignItems="center">
          <TextField
            id="search"
            placeholder="search"
            color="primary"
            size="small"
            sx={{width: "90%"}}
          />
          <Button sx={{width: "10%"}} variant="outlined">
            Search
          </Button>
        </Grid>
      </Grid>

      <DivLineCenter text="Search Restriction Priority List"/>

      <Grid
        mt={3}
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={5} md={5}>
          <DragDropContext onDragEnd={(val)=>{setStateList(dnd_handler(stateList, val.source.index, val.destination?.index || val.source.index) as [])}}>
            <Droppable key="dip0" droppableId="dip0">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <List>
                    <Divider />
                    {stateList.map((e,id)=>{return (<DragComponent cid={id} idx={id} text={e.text}/>)})}
                  </List>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Grid>
      </Grid>

      <DivLineCenter text="Consequence"/>

      <Grid container 
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
      </Grid>
      <Grid container 
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
      </Grid>
      <Grid container 
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
        <Grid item xs={12} md={2}>
          <RecWorkCard />
        </Grid>
      </Grid>


      <FooterComponent/>
    </ThemeProvider>
  )
}