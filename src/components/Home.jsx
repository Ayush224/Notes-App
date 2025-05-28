import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToNotes, updateNotes } from "../redux/OperationsSlice";

const Home = ({ activeTab, setActiveTab, editingNote, setEditingNote }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.crud);

  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setContent(editingNote.content);
    }
  }, [editingNote]);

  const handleSave = () => {
    if (!title.trim() && !content.trim()) return;

    const note = {
      _id: editingNote?._id || Date.now().toString(),
      title: title.trim() || "Untitled",
      content: content.trim(),
      date: new Date().toISOString().slice(0, 10),
    };

    if (editingNote) {
      dispatch(updateNotes(note));
    } else {
      dispatch(addToNotes(note));
    }

    setTitle("");
    setContent("");
    setEditingNote(null);
    setActiveTab("notes");
  };

  const handleCancel = () => {
    setTitle("");
    setContent("");
    setEditingNote(null);
    setActiveTab("notes");
  };

  if (activeTab !== "home") return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {editingNote ? "Edit Note" : "Create New Note"}
          </h2>
          <p className="text-gray-600">
            {editingNote
              ? "Make changes to your note"
              : "Capture your thoughts and ideas"}
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note content here..."
              rows={12}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors resize-none"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={handleCancel}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingNote ? "Update Note" : "Save Note"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
