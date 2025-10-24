import { useState } from "react";
import Header from "./components/Header";
import NotesListPage from "./pages/NotesListPage";
import NotePage from "./pages/NotePage";
import "./App.css";
import { HashRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="container">
      <Router>
        <Header />
        <Routes className="container2">
          <Route path="/" exact Component={NotesListPage} />
          <Route path="note/:noteId/" Component={NotePage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
