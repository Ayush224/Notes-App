import React from "react";
import {
  FileText,
  Plus,
} from "lucide-react";

const Navbar = ({ activeTab, setActiveTab }) => {
  return (
    <div className="bg-black border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div className="flex items-center space-x-2">
          <FileText className="w-8 h-8 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">Notes</h1>
        </div>
        <nav className="flex space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab("home")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "home"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Plus className="w-4 h-4 inline mr-2" />
            New Note
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              activeTab === "notes"
                ? "bg-white text-blue-600 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FileText className="w-4 h-4 inline mr-2" />
            All Notes
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
