import React from "react";
import { Edit3, Copy, Calendar } from "lucide-react";

const ViewNotes = ({
  viewingNote,
  setViewingNote,
  setEditingNote,
  setActiveTab,
}) => {
  const handleCopy = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
    } catch (err) {
      console.error("Failed to copy text");
    }
  };

  const handleEdit = () => {
    setEditingNote(viewingNote);
    setViewingNote(null);
    setActiveTab("home");
  };

  if (!viewingNote) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">View Note</h2>
          <button
            onClick={() => setViewingNote(null)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900">
                {viewingNote.title}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <div className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-900 whitespace-pre-wrap min-h-[300px]">
                {viewingNote.content}
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-1" />
              Created on {viewingNote.date}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={() => handleCopy(viewingNote.content)}
            className="px-4 py-2 text-purple-600 border border-purple-600 rounded-lg hover:bg-purple-50 transition-colors"
          >
            <Copy className="w-4 h-4 inline mr-2" />
            Copy
          </button>
          <button
            onClick={handleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit3 className="w-4 h-4 inline mr-2" />
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewNotes;
