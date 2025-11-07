'use client';

import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Account created! (Stub for now — Stripe works later)');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 to-blue-900">
      <div className="bg-white p-8 rounded-lg shadow-xl w-96 text-black">
        <h1 className="text-3xl font-bold text-center mb-6 text-purple-600">PinealVision</h1>
        <p className="text-center text-gray-600 mb-6">Sign in or create an account to begin.</p>

        <div className="flex mb-6">
          <button
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 text-center ${!isRegister ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 text-center ${isRegister ? 'bg-purple-600 text-white' : 'bg-gray-200'}`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="test@test.com"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-md"
              placeholder="test123"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white py-2 rounded-md font-medium"
          >
            {isRegister ? 'Create Account' : 'Log In'}
          </button>
        </form>
      </div>
    </div>
  );
}
