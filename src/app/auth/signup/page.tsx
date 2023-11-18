"use client";
import { useState } from "react";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import {
  useRegisterUserMutation,
  useUserExistMutation,
} from "@/features/slices/userSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import Loader from "@/components/Loader/Loader";

interface LoginFormProps {
  onSubmit: (
    username: string,
    password: string,
    email: string,
    error: any
  ) => void;
}

interface userDataInterface {
  username: string;
  password: string;
  email: string;
  role: string;
}

const LoginForm: React.FC<LoginFormProps> = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [error, setError] = useState("");
  const userData: userDataInterface = {
    username,
    password,
    email,
    role,
  };
  const [checkUserExistence, { isLoading: existLoading }] =
    useUserExistMutation();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password || !email || !role) {
      return setError("all credential required");
    }
    try {
      const { data: userExistence }: any = await checkUserExistence(userData);
      if (userExistence.msg) {
        toast.error("User Already registered please login");
        setInterval(() => {
          router.push("/auth/signin");
        }, 3000);
      } else {
        await registerUser(userData);
        toast.success("Registered successfully please login");
        router.push("/auth/signin");
      }
    } catch (error: any) {
      setError(error.message);
      console.log(error);
    }
  };
  const handleOptionChange = (value: string) => {
    setRole(value);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      {isLoading ||
        (existLoading && (
          <div className="absolute left-[25%] right-[25%] width-[50%]">
            <Loader />
          </div>
        ))}
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center">sign up</h1>
        <form onSubmit={handleSubmit} className="mt-6">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name:
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

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium mt-2 text-gray-700"
            >
              Email:
            </label>
            <input
              type="text"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-4 py-2 mt-2 text-gray-700 bg-gray-200 border border-gray-300 rounded focus:outline-none focus:bg-white"
              autoFocus
              required
            />
          </div>

          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
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
          <div className="my-2 text-slate-950">
            <RadioGroup onChange={handleOptionChange} required>
              <RadioButton value="seller">
                <p className="text-slate-950">Seller</p>
              </RadioButton>
              <RadioButton value="buyer">
                <p className="text-slate-950">Buyer</p>
              </RadioButton>
            </RadioGroup>
          </div>
          {error && (
            <div>
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
          <button
            type="submit"
            disabled={isLoading || existLoading ? true : false}
            className="w-full py-2 mt-6 font-medium text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center">
          have an account?
          <Link href="/auth/signin" className="text-blue-500 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
