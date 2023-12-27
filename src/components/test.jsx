"use client"
import * as React from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
} from 'react-beautiful-dnd';

const ItemAAA = ({ index, item }) => (
  <Draggable index={index} draggableId={item.id+"identity-fewfefewfewf"}>
    {(provided, snapshot) => (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={{
          // default item style
          padding: '8px 16px',
          // default drag style
          ...provided.draggableProps.style,
          // customized drag style
          background: snapshot.isDragging
            ? 'pink'
            : 'transparent',
        }}
      >
        {item.text}
      </div>
    )}
  </Draggable>
);

const ListAAA = ({ list, onDragEnd }) => (
  <DragDropContext onDragEnd={onDragEnd}>
    <Droppable droppableId="5555">
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {list.map((item, index) => (
            <ItemAAA key={item.id} index={index} item={item} />
          ))}
        </div>
      )}
    </Droppable>
  </DragDropContext>
);

export default ListAAA;