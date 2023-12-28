"use client"
import GlobalChip from "@/components/chipglobal";
import DivLineCenter from "@/components/divline";
import FooterComponent from "@/components/footer";
import NavigationBar from "@/components/navbar";
import { main_theme } from "@/lib/themes";
import { dnd_handler, generateRandomColor } from "@/lib/utils";
import { Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, CssBaseline, Divider, Grid, IconButton, List, ListItem, TextField, ThemeProvider, Typography } from "@mui/material";
import { useEffect, useState } from "react";

import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';

import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';
import { WorkCardComponent } from "@/components/workcomponent";

function DragComponent(props:any) {
  const { cid, idx, text } = props;
  return(
    <Draggable key={text} draggableId={text}
      index={idx}
    >
      {(provided, snapshot) => (
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
      )}
    </Draggable>
  )
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

  const [dgid, setDgid] = useState("dg0");
  useEffect(()=>{
    setDgid(generateRandomColor());
  }, [])

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
            <Droppable key={dgid} droppableId={dgid}>
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  <List>
                    <Divider />
                    {stateList.map((e,id)=>{return (<DragComponent cid={id} idx={id} text={e.text}/>)})}
                  </List>
                  {provided.placeholder}
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
          <WorkCardComponent pic_id={1} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={1} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={2} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={2} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={2} />
        </Grid>
      </Grid>
      <Grid container 
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={1} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={1} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={2} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={2} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={2} />
        </Grid>
      </Grid>
      <Grid container 
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={1} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={1} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={2} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={2} />
        </Grid>
        <Grid item xs={12} md={2}>
          <WorkCardComponent pic_id={2} />
        </Grid>
      </Grid>


      <FooterComponent/>
    </ThemeProvider>
  )
}