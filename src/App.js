import React, { useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Section from "./Section";
import { Dropdown, DropdownButton, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const initialSections = [
    {
      id: "sample module",
      title: "sample module",
      items: [
        { id: "item1", text: "Item 1" },
        {
          id: "item2",
          text: "Item 2",
          children: [{ id: "item3", text: "Item 3" }],
        },
      ],
    },
  ];

  const [showModal, setShowModal] = useState(false);
  const [sections, setSections] = useState(initialSections);
  const [moduleName, setModuleName] = useState("");

  const moveItem = (itemId, targetSectionId) => {
    const updatedSections = sections.map((section) => {
      const sectionCopy = { ...section };
      sectionCopy.items = section.items.filter((item) => item.id !== itemId);
      return sectionCopy;
    });

    const itemToMove = sections
      .flatMap((section) => section.items)
      .find((item) => item.id === itemId);

    const targetSectionIndex = updatedSections.findIndex(
      (section) => section.id === targetSectionId
    );
    updatedSections[targetSectionIndex].items.push(itemToMove);

    setSections(updatedSections);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h2>Course Builder</h2>
      <DropdownButton
        id="dropdown-basic-button"
        title="Add"
        style={{ marginLeft: "auto" }}
      >
        <Dropdown.Item
          onClick={() => {
            setShowModal(true);
          }}
        >
          Create Module
        </Dropdown.Item>
      </DropdownButton>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Create New Module</Modal.Title>
        </Modal.Header>

        <Modal.Body style={{ display: "flex", flexDirection: "column" }}>
          <label>Module Name</label>
          <input
            type="text"
            placeholder="Enter Module Name"
            onChange={(e) => {
              setModuleName(e.target.value);
            }}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setModuleName("");
              setShowModal(false);
            }}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const newSection = {
                id: `section${sections.length + 1}`,
                title: moduleName,
                items: [],
              };
              setSections([...sections, newSection]);
              setModuleName("");
              setShowModal(false);
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
      <div>
        {sections.map((section) => (
          <Section
            key={section.id}
            section={section}
            moveItem={moveItem}
            sections={sections}
            setSections={setSections}
          />
        ))}
      </div>
    </DndProvider>
  );
}

export default App;
