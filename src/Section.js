import React from "react";
import { useDrop } from "react-dnd";
import Item from "./Item";

function Section({ section, sections, setSections }) {
  const [, drop] = useDrop({
    accept: "ITEM",
    drop: (item, monitor) => {
      // Handle item drop logic here
      const itemId = item.id;
      const sourceSectionId = item.sectionId;
      const targetSectionId = section.id;
      setSections((prevSections) => {
        const itemToMove = prevSections
          .flatMap((section) => section.items)
          .find((item) => item.id === itemId);
        let updatedSections = prevSections.map((section) => {
          const sectionCopy = { ...section };
          sectionCopy.items = section.items.filter(
            (item) => item.id !== itemId
          );
          return sectionCopy;
        });
        updatedSections = updatedSections.map((section) => {
          if (section.id === targetSectionId) {
            const sectionCopy = { ...section };
            sectionCopy.items.push(itemToMove);
            return sectionCopy;
          }
          return section;
        });
        console.log(prevSections, updatedSections);
        return updatedSections;
      });
    },
  });

  return (
    <div ref={drop} style={{ padding: "1rem", border: "1px solid black" }}>
      <h2>{section.title}</h2>
      {section.items.map((item) => (
        <Item key={item.id} item={item} section={section} />
      ))}
    </div>
  );
}

export default Section;
