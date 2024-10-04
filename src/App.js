import React from "react";
import AddVerse from "./components/AddVerse";
import VerseTable from "./components/VerseTable";
import EditVerse from "./components/EditVerse";
import FeaturesGrid from "./components/FeaturesGrid";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<FeaturesGrid />} />
            <Route path="/add-verse" element={<AddVerse />} />
            <Route path="/versetable" element={<VerseTable />} />
            <Route path="/edit-verse/:id" element={<EditVerse />} />
        </Routes>
    </Router>
);
}

export default App;
