import React, { useState, useRef, useEffect } from 'react';
import { Search, Mic, Settings, User, Shield, Info, FileText, LogOut, Fish, Database, TrendingUp, Waves, Menu as MenuIcon, X, BarChart3, Import, Import as Export } from 'lucide-react';
import { Navigate, useNavigate, useNavigation } from 'react-router-dom';

const VoiceSearch = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const startVoiceSearch = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setSearchQuery(transcript);
        onSearch(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
        alert('Voice search error. Please try again.');
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current.start();
    } else {
      alert('Voice search is not supported in your browser. Please use Chrome or Edge for voice functionality.');
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
        <input
          type="text"
          placeholder="Search pond details, fish exports, transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-12 pr-14 py-3 w-72 lg:w-96 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 shadow-sm"
        />
        <button
          type="button"
          onClick={startVoiceSearch}
          disabled={isListening}
          className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-all duration-200 ${
            isListening 
              ? 'text-red-500 bg-red-50 animate-pulse shadow-lg' 
              : 'text-gray-500 hover:text-blue-500 hover:bg-blue-50 hover:shadow-md'
          }`}
        >
          <Mic className="h-5 w-5" />
        </button>
      </div>
      
      {isListening && (
        <div className="absolute right-0 top-full mt-3 bg-white border rounded-xl shadow-xl p-4 z-50 animate-fadeIn">
          <div className="flex items-center space-x-3 text-red-500">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium">Listening for your voice...</span>
          </div>
        </div>
      )}
    </form>
  );
};

const MenuDropdown = ({ isOpen, onClose }) => { 
    const nav= useNavigate()
  const menuItems = [
    { icon: Settings, label: 'Settings', action: () => nav("/settings") },
    { icon: Shield, label: 'Privacy & Policy', action: () => console.log('Privacy Policy clicked') },
    { icon: Info, label: 'About Website', action: () => console.log('About clicked') },
    { icon: FileText, label: 'Terms & Conditions', action: () => console.log('Terms clicked') },
    { icon: User, label: 'Profile', action: () => console.log('Profile clicked') },
    { icon: LogOut, label: 'Sign Out', action: () => console.log('Sign Out clicked') },
  ];

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 top-full mt-3 w-64 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden animate-slideDown">
      <div className="py-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={() => {
              item.action();
              onClose();
            }}
            className="w-full px-5 py-3 text-left flex items-center space-x-4 hover:bg-gray-50 transition-colors duration-150 border-b border-gray-50 last:border-b-0"
          >
            <item.icon className="h-5 w-5 text-gray-500" />
            <span className="text-gray-700 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const SubdivisionCard = ({ title, description, icon: Icon, buttonText, onClick, gradient, features }) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 overflow-hidden border border-gray-100">
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 ${gradient}`}></div>
      
      <div className="relative p-8">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl mb-6 ${gradient} transform group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
          <Icon className="h-10 w-10 text-white" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-4 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-600 leading-relaxed mb-6 min-h-[100px] text-base">
          {description}
        </p>

        <div className="mb-6">
          <h4 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Key Features:</h4>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center text-sm text-gray-600">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3"></div>
                {feature}
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={onClick}
          className={`w-full py-4 px-6 rounded-xl text-white font-semibold transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl ${gradient} hover:brightness-110`}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Implement search functionality here
  };

  const handlePondDetailsClick = () => {
    console.log('Navigating to Pond Details System');
    // Navigate to pond details page
  };

  const handleFishImportExportClick = () => {
    console.log('Navigating to Fish Import & Export System');
    // Navigate to fish import/export page
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest('.menu-container')) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Website Title */}
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-3 rounded-xl">
                <Fish className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  Fish Farming Business Portal
                </h1>
                <p className="text-sm text-gray-500 hidden sm:block">
                  Complete Aquaculture Management System
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:block">
              <VoiceSearch 
                onSearch={handleSearch} 
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />
            </div>

            {/* Menu Button */}
            <div className="relative menu-container">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors duration-200 relative"
              >
                {menuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <MenuIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
              
              <MenuDropdown isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="md:hidden pb-4">
            <VoiceSearch 
              onSearch={handleSearch} 
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-6">
            Welcome to Your Aquaculture Hub
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Streamline your fish farming operations with our comprehensive business portal. 
            Manage pond details, track fish imports and exports, monitor expenses, and optimize your aquaculture business.
          </p>
        </div>

        {/* Subdivision Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          <SubdivisionCard
            title="Pond Details Storage System"
            description="Comprehensive pond management system to track water quality, fish population, feeding schedules, and health monitoring. Monitor multiple ponds with detailed analytics and automated reporting features."
            icon={Database}
            buttonText="Access Pond Management"
            onClick={handlePondDetailsClick}
            gradient="bg-gradient-to-r from-blue-600 to-blue-700"
            features={[
              "Water quality monitoring and alerts",
              "Fish population tracking and analytics", 
              "Feeding schedule management",
              "Health monitoring and disease tracking",
              "Pond maintenance scheduling"
            ]}
          />

          <SubdivisionCard
            title="Fish Import & Export System"
            description="Advanced trading system for fish import and export operations. Track shipments, manage billing, monitor market prices, and handle international trade documentation with ease."
            icon={TrendingUp}
            buttonText="Access Trade Management"
            onClick={handleFishImportExportClick}
            gradient="bg-gradient-to-r from-cyan-600 to-teal-600"
            features={[
              "Import and export tracking",
              "Automated billing and invoicing",
              "Market price monitoring",
              "Shipment and logistics management",
              "Trade documentation handling"
            ]}
          />
        </div>

        {/* Additional Info Section */}
        <div className="mt-20 bg-white rounded-2xl shadow-lg p-8 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <BarChart3 className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Analytics & Reports</h3>
              <p className="text-gray-600">
                Get detailed insights into your operations with comprehensive analytics and automated reporting.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Waves className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Water Management</h3>
              <p className="text-gray-600">
                Advanced water quality monitoring with real-time alerts and automated maintenance scheduling.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Fish className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fish Health Tracking</h3>
              <p className="text-gray-600">
                Monitor fish health, track growth patterns, and get early disease detection alerts.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-300">
            © 2025 Fish Farming Business Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;