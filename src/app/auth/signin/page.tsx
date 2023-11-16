'use client'
import { useState } from 'react';
import Link from 'next/link';
import { FcGoogle } from "react-icons/fc";
import { useLoginUserMutation, useUserExistMutation } from '@/features/slices/userSlice';
import { setCredentials } from '@/features/slices/userSliceStore';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {toast} from 'react-toastify'

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [signUserIn, {isLoading, error}] = useLoginUserMutation()
  const [checkIfExist, {isLoading: existLogin}] = useUserExistMutation()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userInfo = {
      email,
      password
    }
    const {data:isUserExist}:any = await checkIfExist(userInfo)
    if(isUserExist.msg){
      const res = await signUserIn(userInfo)
      console.log(res)
    }else{
      toast.error('No Account has found please Register')
      router.push('/auth/signup')
    }
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
              Email
            </label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={handleEmailChange}
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