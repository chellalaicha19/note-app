import React from "react";
import { Link } from "react-router-dom";
import "./ListItem.css";

const getTitle = (note) => {
  let title = note.body.split("\n")[0];
  if (title.length > 45) {
    return title.slice(0, 45);
  }
  return title;
};

const getTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

const getContent = (note) => {
  let title = getTitle(note);
  let content = note.body.replaceAll("\n", "");
  content = content.replaceAll(title, "");
  if (content.length > 45) {
    return content.slice(0, 45) + "...";
  } else {
    return content;
  }
};

const ListItem = ({ note }) => {
  return (
    <div className="containerL">
      <div className="title"></div>
      <div>
        <Link to={`/note/${note.id}/`}>{getTitle(note)}</Link>
        <p>
          <span>{getTime(note) + "  "}</span>
          <span>{getContent(note)}</span>
        </p>
      </div>
    </div>
  );
};

export default ListItem;
