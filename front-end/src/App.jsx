import React, { useState, useEffect } from 'react';
import { Mail, Phone, Lock, User, Shield, Eye, EyeOff, Timer, CheckCircle, ArrowRight } from 'lucide-react';
import './App.css';

function App() {
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [loginMethod, setLoginMethod] = useState('email'); // 'email' or 'phone'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    otp: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const [loginAttempts, setLoginAttempts] = useState(0);

  // OTP Timer effect
  useEffect(() => {
    if (otpTimer > 0) {
      const timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [otpTimer]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (authMode === 'register') {
      if (!formData.username.trim()) newErrors.username = 'Username is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!formData.password || formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters';
      }
    } else {
      if (loginMethod === 'email') {
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
      } else {
        if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
        if (otpSent && !formData.otp) newErrors.otp = 'OTP is required';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOTP = async () => {
    if (!formData.phone.trim()) {
      setErrors({ phone: 'Phone number is required' });
      return;
    }
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setOtpSent(true);
    setOtpTimer(60);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // Add shake animation to form
      const form = e.target;
      form.classList.add('animate-shake');
      setTimeout(() => form.classList.remove('animate-shake'), 500);
      return;
    }

    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    
    // Simulate login failure for demo
    if (authMode === 'login' && Math.random() > 0.7) {
      setLoginAttempts(prev => prev + 1);
      setErrors({ general: 'Invalid credentials. Please try again.' });
    } else {
      alert(`${authMode === 'login' ? 'Login' : 'Registration'} successful!`);
    }
  };

  const switchAuthMode = () => {
    setAuthMode(prev => prev === 'login' ? 'register' : 'login');
    setErrors({});
    setFormData({
      username: '',
      email: '',
      password: '',
      phone: '',
      otp: ''
    });
    setOtpSent(false);
    setOtpTimer(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-800 flex items-center justify-center p-4">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      {/* Main Container */}
      <div className="relative w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden min-h-[600px]">
          <div className="flex flex-col md:flex-row h-full">
            
            {/* Left Panel - Form */}
            <div className="w-full md:w-1/2 p-8 md:p-12">
              <div className="max-w-sm mx-auto">
                
                {/* Security Badge */}
                <div className="flex items-center justify-center mb-6">
                  <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm flex items-center gap-2 animate-pulse">
                    <Shield className="w-4 h-4" />
                    Secured & Encrypted
                  </div>
                </div>

                {/* Mode Toggle */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {authMode === 'login' ? 'Welcome Back!' : 'Create Account'}
                  </h2>
                  <p className="text-gray-600">
                    {authMode === 'login' 
                      ? 'Login securely to your account' 
                      : 'Join us for a secure experience'
                    }
                  </p>
                </div>

                {/* Login Method Tabs (only show in login mode) */}
                {authMode === 'login' && (
                  <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setLoginMethod('email')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                        loginMethod === 'email'
                          ? 'bg-white text-blue-600 shadow-sm transform scale-105'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      Email
                    </button>
                    <button
                      onClick={() => setLoginMethod('phone')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-all duration-300 ${
                        loginMethod === 'phone'
                          ? 'bg-white text-blue-600 shadow-sm transform scale-105'
                          : 'text-gray-600 hover:text-gray-800'
                      }`}
                    >
                      <Phone className="w-4 h-4" />
                      Phone
                    </button>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Registration Fields */}
                  {authMode === 'register' && (
                    <div className="animate-fadeInUp">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Username"
                          value={formData.username}
                          onChange={(e) => handleInputChange('username', e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                            errors.username ? 'border-red-500 animate-shake' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
                    </div>
                  )}

                  {/* Email Field */}
                  {(authMode === 'register' || loginMethod === 'email') && (
                    <div className="animate-fadeInUp">
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="email"
                          placeholder="Email"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                            errors.email ? 'border-red-500 animate-shake' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  )}

                  {/* Phone Field */}
                  {authMode === 'login' && loginMethod === 'phone' && (
                    <div className="animate-fadeInUp">
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="tel"
                          placeholder="Phone Number"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className={`w-full pl-12 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                            errors.phone ? 'border-red-500 animate-shake' : 'border-gray-300'
                          }`}
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                      
                      {!otpSent && (
                        <button
                          type="button"
                          onClick={handleSendOTP}
                          disabled={isLoading}
                          className="w-full mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                          {isLoading ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <>
                              Send OTP
                              <ArrowRight className="w-4 h-4" />
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  )}

                  {/* OTP Field */}
                  {authMode === 'login' && loginMethod === 'phone' && otpSent && (
                    <div className="animate-fadeInUp">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Enter OTP"
                          value={formData.otp}
                          onChange={(e) => handleInputChange('otp', e.target.value)}
                          className={`w-full pl-12 pr-16 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                            errors.otp ? 'border-red-500 animate-shake' : 'border-gray-300'
                          }`}
                        />
                        {otpTimer > 0 && (
                          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1 text-blue-600">
                            <Timer className="w-4 h-4" />
                            <span className="text-sm font-mono">{otpTimer}s</span>
                          </div>
                        )}
                      </div>
                      {errors.otp && <p className="text-red-500 text-sm mt-1">{errors.otp}</p>}
                      
                      <p className="text-sm text-gray-600 mt-1">
                        {otpTimer > 0 
                          ? `Resend OTP in ${otpTimer} seconds`
                          : <button type="button" onClick={handleSendOTP} className="text-blue-600 hover:underline">Resend OTP</button>
                        }
                      </p>
                    </div>
                  )}

                  {/* Password Field */}
                  {(authMode === 'register' || loginMethod === 'email') && (
                    <div className="animate-fadeInUp">
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          value={formData.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className={`w-full pl-12 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ${
                            errors.password ? 'border-red-500 animate-shake' : 'border-gray-300'
                          }`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                    </div>
                  )}

                  {/* General Error */}
                  {errors.general && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm animate-fadeInUp">
                      {errors.general}
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:transform-none flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        {authMode === 'login' ? 'Login' : 'Register'}
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  {/* Social Login Divider */}
                  <div className="flex items-center my-6">
                    <div className="flex-1 border-t border-gray-300"></div>
                    <span className="px-3 text-gray-500 text-sm">or continue with</span>
                    <div className="flex-1 border-t border-gray-300"></div>
                  </div>

                  {/* Social Login Buttons */}
                  <div className="flex justify-center space-x-4">
                    {['Google', 'Facebook', 'GitHub', 'LinkedIn'].map((provider) => (
                      <button
                        key={provider}
                        type="button"
                        className="w-12 h-12 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-50 transition-all duration-300 hover:scale-110"
                      >
                        <span className="text-xs font-bold text-gray-600">
                          {provider.charAt(0)}
                        </span>
                      </button>
                    ))}
                  </div>
                </form>
              </div>
            </div>

            {/* Right Panel - Welcome */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-blue-600 to-purple-600 p-8 md:p-12 flex items-center justify-center text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 border border-white rounded-full"></div>
                <div className="absolute top-32 right-16 w-16 h-16 border border-white rounded-full"></div>
                <div className="absolute bottom-20 left-20 w-12 h-12 border border-white rounded-full"></div>
                <div className="absolute bottom-32 right-10 w-8 h-8 border border-white rounded-full"></div>
              </div>

              <div className="text-center relative z-10">
                <div className="mb-8">
                  <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Shield className="w-10 h-10" />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">
                    {authMode === 'login' ? 'Welcome Back!' : 'Hello Friend!'}
                  </h3>
                  <p className="text-blue-100 mb-8">
                    {authMode === 'login' 
                      ? 'Don\'t have an account? Join us today!' 
                      : 'Already have an account? Sign in here!'
                    }
                  </p>
                </div>

                <button
                  onClick={switchAuthMode}
                  className={`border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white hover:text-blue-600 transition-all duration-300 transform hover:scale-105 ${
                    loginAttempts > 2 ? 'animate-pulse bg-white bg-opacity-20' : ''
                  }`}
                >
                  {authMode === 'login' ? 'Register' : 'Login'}
                </button>

                {/* Security Features */}
                <div className="mt-12 text-left space-y-3">
                  <h4 className="font-semibold mb-4">Security Features:</h4>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span className="text-sm">End-to-end encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span className="text-sm">No third-party access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-300" />
                    <span className="text-sm">Enterprise-grade security</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
          20%, 40%, 60%, 80% { transform: translateX(10px); }
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.6s ease-out;
        }
      `}</style>
    </div>
  );
}

export default App;