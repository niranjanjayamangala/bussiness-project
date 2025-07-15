import { useState } from "react";
import SearchBar from "../components/SearchBar";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/80 shadow-md relative">
        <div className="text-3xl font-bold text-blue-700 text-center w-full">
          Business Portal
        </div>
        <div className="absolute right-6 top-4 flex items-center gap-4">
          <SearchBar onSearch={() => {}} />
          <button
            className="ml-2 p-2 rounded-full hover:bg-blue-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
          {menuOpen && (
            <div className="absolute right-0 mt-12 w-48 bg-white rounded shadow-lg z-50">
              <ul className="divide-y divide-gray-200">
                <li><button className="w-full text-left px-4 py-2 hover:bg-blue-50 flex items-center gap-2"><span role="img" aria-label="settings">⚙️</span> Settings</button></li>
                <li><button className="w-full text-left px-4 py-2 hover:bg-blue-50">Privacy & Policy</button></li>
                <li><button className="w-full text-left px-4 py-2 hover:bg-blue-50">About Website</button></li>
                <li><button className="w-full text-left px-4 py-2 hover:bg-blue-50">Terms and Conditions</button></li>
                <li><button className="w-full text-left px-4 py-2 hover:bg-blue-50 text-red-500">Sign Out</button></li>
              </ul>
            </div>
          )}
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="flex flex-col md:flex-row gap-8 mt-16 bg-white/80 rounded-xl p-8 shadow-lg">
          {/* Pond Details Card */}
          <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center w-80 border border-blue-100">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">Pond Details Storage System</h2>
            <p className="mb-6 text-gray-600 text-center">Manage all your pond, fish, feed, and labour data in one place. Secure, organized, and easy to use for business owners.</p>
            <button
              className="btn btn-primary px-6 py-2 rounded"
              onClick={() => alert("Navigate to Pond Details Storage System")}
            >
              Enter Pond Details
            </button>
          </div>
          {/* Fish Import/Export Card */}
          <div className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col items-center w-80 border border-blue-100">
            <h2 className="text-2xl font-bold mb-2 text-blue-700">Fish Import & Export System</h2>
            <p className="mb-6 text-gray-600 text-center">Track fish import/export, transactions, expenses, and billing. Designed for business efficiency and growth.</p>
            <button
              className="btn btn-primary px-6 py-2 rounded"
              onClick={() => alert("Navigate to Fish Import & Export System")}
            >
              Enter Fish Import/Export
            </button>
          </div>
        </div>
      </main>
    </div>
  );
} 