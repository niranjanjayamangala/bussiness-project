import React from 'react';
import { Lock, Timer } from 'lucide-react';

export default function OtpSection({ value, onChange, onResend, timer, error }) {
  return (
    <div className="animate-fadeInUp">
      <div className="relative">
        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Enter OTP"
          value={value}
          onChange={onChange}
          className={`w-full pl-12 pr-16 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${error ? 'border-red-500 animate-shake' : 'border-gray-300'}`}
        />
        {timer > 0 && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-blue-600">
            <Timer className="w-4 h-4" />
            <span className="text-sm font-mono">{timer}s</span>
          </div>
        )}
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      <p className="text-sm text-gray-600 mt-1">
        {timer > 0 ? `Resend OTP in ${timer} seconds` : (
          <button type="button" onClick={onResend} className="text-blue-600 hover:underline">Resend OTP</button>
        )}
      </p>
    </div>
  );
}