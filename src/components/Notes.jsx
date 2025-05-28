import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Edit3,
  FileText,
  Search,
  Plus,
  Eye,
  Copy,
  Trash2,
  Calendar,
} from "lucide-react";
import toast from "react-hot-toast";
import { deleteFromNotes } from "../redux/OperationsSlice";

const Notes = ({ activeTab, setActiveTab, setEditingNote, setViewingNote }) => {
  const [searchText, setSearchText] = useState("");
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.crud);

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchText.toLowerCase()) ||
      note.content.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(deleteFromNotes(id));
  };

  const handleEdit = (note) => {
    setEditingNote(note);
    setActiveTab("home");
  };

  const handleView = (note) => {
    setViewingNote(note);
  };

  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Content copied!!");
    } catch (err) {
      console.error("Failed to copy text");
    }
  };

  if (activeTab !== "notes") return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search notes..."
            className="w-full pl-10 pr-4 py-3 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-colors"
          />
        </div>
      </div>

      {filteredNotes.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchText ? "No notes found" : "No notes yet"}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchText
              ? "Try adjusting your search terms"
              : "Create your first note to get started"}
          </p>
          {!searchText && (
            <button
              onClick={() => setActiveTab("home")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Create Note
            </button>
          )}
        </div>
      ) : (
        <div className="grid gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate mb-2">
                    {note.title}
                  </h3>
                  <p className="text-gray-600 line-clamp-2">{note.content}</p>
                </div>
                <div className="flex space-x-2 ml-4">
                  <button
                    onClick={() => handleEdit(note)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleView(note)}
                    className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    title="View"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleCopy(note.content)}
                    className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="w-4 h-4 mr-1" />
                Created on {note.date}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notes;
