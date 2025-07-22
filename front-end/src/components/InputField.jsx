import React from 'react';
import { Mail, Phone, User } from 'lucide-react';

const icons = { email: Mail, phone: Phone, username: User };

export default function InputField({ type = 'text', iconType, value, onChange, placeholder, error }) {
  const Icon = icons[iconType];

  return (
    <div className="relative animate-fadeInUp">
      {Icon && <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />}
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${error ? 'border-red-500 animate-shake' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
