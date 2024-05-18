import React from "react";
import { useDrag } from "react-dnd";

function Item({ item, section }) {
  const [{ isDragging }, drag] = useDrag({
    type: "ITEM",
    item: { id: item.id, sectionId: section.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{
        padding: "0.5rem",
        margin: "0.5rem",
        backgroundColor: "white",
        border: "1px solid gray",
        opacity: isDragging ? 0.5 : 1,
      }}
    >
      {item.text}
      {item.children && (
        <div style={{ paddingLeft: "1rem" }}>
          {/* {item.children.map((child) => (
            <Item key={child.id} item={child} section={section} />
          ))} */}
        </div>
      )}
    </div>
  );
}

export default Item;
