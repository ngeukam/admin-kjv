import React from "react";
import AddVerse from "./components/AddVerse";
import VerseTable from "./components/VerseTable";
import EditVerse from "./components/EditVerse";
import AddVerse_n from "./components/AddVerse_n";
import VerseTable_n from "./components/VerseTable_n";
import EditVerse_n from "./components/EditVerse_n";
import FeaturesGrid from "./components/FeaturesGrid";
import AddEvent from "./components/AddEvent";
import EventTable from "./components/EventTable";
import EditEvent from "./components/EditEvent";
import AddPrayer from "./components/Addprayer";
import PrayerTable from "./components/PrayerTable";
import EditPrayer from "./components/EditPrayer";
import ProtectedRoute from "./middleware/ProtectedRoute";
import Login from "./components/Login";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
function App() {
  return (
    <Router>
        <Routes>
            <Route path="/login" element={<Login />} /> 

             {/* Routes protégées */}
            <Route path="/" element={<ProtectedRoute><FeaturesGrid /></ProtectedRoute>} />
            <Route path="/add-verse" element={<ProtectedRoute><AddVerse /></ProtectedRoute>} />
            <Route path="/versetable" element={<ProtectedRoute><VerseTable /></ProtectedRoute>} />
            <Route path="/edit-verse/:id" element={<ProtectedRoute><EditVerse /></ProtectedRoute>} />

            <Route path="/nbls-add-verse" element={<ProtectedRoute><AddVerse_n /></ProtectedRoute>} />
            <Route path="/nbls-versetable" element={<ProtectedRoute><VerseTable_n /></ProtectedRoute>} />
            <Route path="/nbls-edit-verse/:id" element={<ProtectedRoute><EditVerse_n /></ProtectedRoute>} />

            <Route path="/add-event" element={<ProtectedRoute><AddEvent /></ProtectedRoute>} />
            <Route path="/eventtable" element={<ProtectedRoute><EventTable /></ProtectedRoute>} />
            <Route path="/edit-event/:id" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />

            <Route path="/add-prayer" element={<ProtectedRoute><AddPrayer /></ProtectedRoute>} />
            <Route path="/prayertable" element={<ProtectedRoute><PrayerTable /></ProtectedRoute>} />
            <Route path="/edit-prayer/:id" element={<ProtectedRoute><EditPrayer /></ProtectedRoute>} />
        </Routes>
    </Router>
);
}

export default App;
