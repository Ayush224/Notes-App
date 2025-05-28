import Home from "./components/Home";
import Notes from "./components/Notes";
import ViewNotes from "./components/ViewNotes";
import Navbar from "./components/Navbar"
import React, { useState } from "react";


const App = () => {
  const [activeTab, setActiveTab] = useState('notes');
  const [editingNote, setEditingNote] = useState(null);
  const [viewingNote, setViewingNote] = useState(null);

  return (
    <div className="min-h-screen bg-gray-300">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <Home
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        editingNote={editingNote}
        setEditingNote={setEditingNote}
      />
      
      <Notes
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        setEditingNote={setEditingNote}
        viewingNote={viewingNote}
        setViewingNote={setViewingNote}
      />
      
      <ViewNotes
        viewingNote={viewingNote}
        setViewingNote={setViewingNote}
        setEditingNote={setEditingNote}
        setActiveTab={setActiveTab}
      />
    </div>
  );
};

export default App;