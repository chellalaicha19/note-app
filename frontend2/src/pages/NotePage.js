import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./NotePage.css";
import { FiArrowLeft } from "react-icons/fi";

const NotePage = ({ match }) => {
  const { noteId } = useParams();
  let [note, setNote] = useState(null);
  const navigate = useNavigate();
  const [updateBody, setUpdateBody] = useState("");

  useEffect(() => {
    getNote();
  }, [noteId]);

  let getNote = async () => {
    let response = await fetch(`http://127.0.0.1:8000/api/notes/${noteId}/`);
    let data = await response.json();
    setNote(data);
    setUpdateBody(data.body);
  };

  const updateNote = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/notes/${noteId}/update/`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ body: updateBody }),
      }
    );

    if (response.ok) {
      let data = await response.json();
      setNote(data);
      navigate("/");
    }
  };

  const deleteNote = async () => {
    let response = await fetch(
      `http://127.0.0.1:8000/api/notes/${noteId}/delete/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <div className="note-container">
      {/* Back Arrow */}
      <div className="note-header" onClick={() => navigate(-1)}>
        <FiArrowLeft className="back-arrow" />
      </div>

      <textarea
        className="content"
        value={updateBody}
        onChange={(e) => setUpdateBody(e.target.value)}
      />
      <button onClick={updateNote}>Save Changes</button>
      <button onClick={deleteNote}>Delete Note</button>
    </div>
  );
};

export default NotePage;
