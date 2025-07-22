import React from 'react';

export default function SocialLogin() {
  const providers = ['Google', 'Facebook', 'GitHub', 'LinkedIn'];
  return (
    <div className="flex justify-center space-x-4">
      {providers.map((provider) => (
        <button
          key={provider}
          type="button"
          className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
        >
          <span className="text-xs font-bold text-gray-600">{provider.charAt(0)}</span>
        </button>
      ))}
    </div>
  );
}