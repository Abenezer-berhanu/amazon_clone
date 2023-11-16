'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSubmit }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  const handleGoogleLogin = () => {
    // Handle Google login
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={handleUsernameChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:bg-white"
              autoFocus
              required
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:bg-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-6 font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center mt-6">
          <button
            onClick={handleGoogleLogin}
            className="flex items-center px-4 py-2 space-x-2 text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 focus:outline-none"
          >
            <FcGoogle />
            <span>Continue with Google</span>
          </button>
        </div>
        <p className="mt-4 text-center">
          have no account?{' '}
          <Link href="/auth/signup" className="text-blue-500 underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;