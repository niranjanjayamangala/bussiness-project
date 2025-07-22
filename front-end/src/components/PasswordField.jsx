import React from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function PasswordField({ value, onChange, show, toggle, error }) {
  return (
    <div className="relative animate-fadeInUp">
      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type={show ? 'text' : 'password'}
        value={value}
        placeholder="Password"
        onChange={onChange}
        className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${error ? 'border-red-500 animate-shake' : 'border-gray-300'}`}
      />
      <button type="button" onClick={toggle} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
