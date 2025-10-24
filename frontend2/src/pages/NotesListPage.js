import React, { useState, useEffect } from "react";
import ListItem from "../components/ListItem";
import "./NotesListPage.css"; // Import the CSS file
import { FiMenu, FiPlus } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const NotesListPage = () => {
  let [notes, setNotes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/notes/");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const addNote = async () => {
    try {
      let response = await fetch(`http://127.0.0.1:8000/api/notes/create/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: "" }), // Create an empty note
      });

      if (response.ok) {
        let newNote = await response.json();
        setNotes([...notes, newNote]); // Add the new note to the state
        navigate(`/note/${newNote.id}`); // Redirect user to edit the new note
      } else {
        console.error("Failed to create note");
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="notes-container">
      <div className="notes-header">
        <FiMenu className="menu-icon" />
        <h3>Notes</h3>
        <span className="notes-count">{notes.length}</span>
      </div>
      <div className="notes-list">
        {notes.map((note, index) => (
          <ListItem key={index} note={note} />
        ))}
      </div>
      <button className="add-note-button" onClick={addNote}>
        <FiPlus className="plus-icon" />
      </button>
    </div>
  );
};

export default NotesListPage;
