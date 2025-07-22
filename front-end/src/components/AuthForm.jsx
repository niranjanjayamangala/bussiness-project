import React, { useState } from 'react';
import InputField from './InputField';
import PasswordField from './PasswordField';
import SocialLogin from './SocialLogin';
import { auth } from '../services/firebase.js';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { saveUser } from '../services/api.js';

export default function AuthForm() {
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const [loginType, setLoginType] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      if (mode === 'register') {
        if (loginType === 'email') {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          const user = userCredential.user;
          await saveUser({ uid: user.uid, email: user.email, username });
          setSuccess('User registered and saved successfully.');
        } else {
          setError('Phone registration is not implemented in this demo.');
        }
      } else {
        if (loginType === 'email') {
          await signInWithEmailAndPassword(auth, email, password);
          setSuccess('Logged in successfully.');
        } else {
          setError('Phone login is not implemented in this demo.');
        }
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden mt-8 mx-auto bg-transparent">
      {/* Left: Form */}
      <div className="bg-white flex-1 p-10 flex flex-col justify-center min-w-[320px]">
        {/* Toggle at the very top */}
        <div className="flex justify-center mb-6">
          <div className="flex rounded-lg overflow-hidden border border-gray-200 shadow-sm">
            <button
              className={`px-6 py-2 font-semibold text-lg transition-colors duration-200 ${mode === 'login' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              style={{ borderRight: '1px solid #e5e7eb' }}
              onClick={() => setMode('login')}
            >
              Login
            </button>
            <button
              className={`px-6 py-2 font-semibold text-lg transition-colors duration-200 ${mode === 'register' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}
              onClick={() => setMode('register')}
            >
              Register
            </button>
          </div>
        </div>
        {/* Secured & Encrypted badge */}
        <div className="flex justify-center mb-6">
          <span className="bg-green-100 text-green-700 px-4 py-1 rounded-full flex items-center gap-2 text-sm font-medium">
            <svg className="w-4 h-4 inline-block" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.105.895-2 2-2s2 .895 2 2-.895 2-2 2-2-.895-2-2zm0 0V7m0 4v4m0 0h4m-4 0H8" /></svg>
            Secured & Encrypted
          </span>
        </div>
        <h2 className="text-2xl font-bold text-center mb-2">{mode === 'login' ? 'Welcome Back!' : 'Create Account'}</h2>
        <p className="text-center text-gray-500 mb-6">{mode === 'login' ? 'Login securely to your account' : 'Register securely to your account'}</p>
        <div className="flex mb-4 rounded-lg overflow-hidden border border-gray-200">
          <button
            className={`flex-1 py-2 text-sm font-medium ${loginType === 'email' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'}`}
            onClick={() => setLoginType('email')}
          >
            <span className="inline-block mr-1">📧</span> Email
          </button>
          <button
            className={`flex-1 py-2 text-sm font-medium ${loginType === 'phone' ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-500'}`}
            onClick={() => setLoginType('phone')}
          >
            <span className="inline-block mr-1">📱</span> Phone
          </button>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <InputField value={username} onChange={(e) => setUsername(e.target.value)} iconType="username" placeholder="Username" />
          )}
          {loginType === 'email' ? (
            <InputField type="email" value={email} onChange={(e) => setEmail(e.target.value)} iconType="email" placeholder="Email" />
          ) : (
            <InputField type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} iconType="phone" placeholder="Phone" />
          )}
          <PasswordField value={password} onChange={(e) => setPassword(e.target.value)} show={showPassword} toggle={() => setShowPassword(!showPassword)} />
          <button
            type="submit"
            className="w-full py-2 rounded bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:from-blue-600 hover:to-purple-600 transition"
          >
            {mode === 'login' ? 'Login' : 'Register'} <span className="ml-2">→</span>
          </button>
        </form>
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}
        {success && <p className="text-green-600 text-sm text-center">{success}</p>}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="mx-3 text-gray-400 text-sm">or continue with</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>
        <div className="flex justify-center gap-3">
          <SocialLogin />
        </div>
      </div>
      {/* Right: Info/Welcome */}
      <div className="flex-1 bg-gradient-to-br from-blue-500 to-purple-500 text-white flex flex-col justify-center items-center p-10 min-w-[320px]">
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <svg className="w-14 h-14 mx-auto text-white/80" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeOpacity=".2" /><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01" /></svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">{mode === 'login' ? 'Welcome Back!' : 'Join Us Today!'}</h2>
          <p className="mb-6 text-white/90">{mode === 'login' ? "Don't have an account?" : 'Already have an account?'}</p>
          <button
            className="border border-white rounded-full px-8 py-2 text-lg font-semibold mb-8 hover:bg-white hover:text-blue-600 transition"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
          >
            {mode === 'login' ? 'Register' : 'Login'}
          </button>
          <div className="text-left w-full max-w-xs">
            <div className="font-semibold mb-2">Security Features:</div>
            <ul className="space-y-2">
              <li className="flex items-center gap-2"><span className="text-green-300">✔️</span> End-to-end encryption</li>
              <li className="flex items-center gap-2"><span className="text-green-300">✔️</span> No third-party access</li>
              <li className="flex items-center gap-2"><span className="text-green-300">✔️</span> Enterprise-grade security</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}