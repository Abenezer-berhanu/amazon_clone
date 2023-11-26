"use client";
import Button from "../Button/Button";
import { setCredentials } from "@/features/slices/userSliceStore";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateUserProfileMutation } from "@/features/slices/userSlice";
import { useState } from "react";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
import { useRouter } from "next/navigation";

function UpdateProfile({ id }: any) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updateUser, { isLoading }] = useUpdateUserProfileMutation();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("password and confirm password is not same");
    } else {
      const newUserData = {
        name,
        email,
        password,
        id,
      };
      const { data }: any = await updateUser(newUserData);
      dispatch(setCredentials({ msg:  data  }));
      toast.success("Profile updated it might take 2 minutes to see changes");
      router.push("/");
    }
  };

  return (
    <div className="my-8 border border-slate-200 shadow-md p-5 flex flex-col gap-4 w-[100%] mdl:w-[35%] mx-auto">
      <h1 className="text-lg font-bold pl-5">Update Profile</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <form className="pl-5 grid gap-4 text-sm" onSubmit={handleSubmit}>
          <span className="flex flex-col gap-1">
            <label className="font-semibold tracking-wide text-slate-800">
              Name:
            </label>
            <input
              type="text"
              className="w-[80%] max-w-[300px] py-1 outline-none border border-slate-400 rounded-md bg-opacity-30 indent-3 text-black"
              placeholder={userInfo?.msg?.username}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </span>
          <span className="flex flex-col gap-1">
            <label className="font-semibold tracking-wide text-slate-800">
              Email:
            </label>
            <input
              type="email"
              className="w-[80%] max-w-[300px] py-1 outline-none border border-slate-400 rounded-md bg-opacity-30 indent-3 text-black"
              placeholder={userInfo.msg.email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </span>
          <span className="flex flex-col gap-1">
            <label className="font-semibold tracking-wide text-slate-800">
              Password:
            </label>
            <input
              type="password"
              className="w-[80%] max-w-[300px] py-1 outline-none border border-slate-400 rounded-md bg-opacity-30 indent-3 text-black"
              placeholder={"enter password"}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </span>
          <span className="flex flex-col gap-1">
            <label className="font-semibold tracking-wide text-slate-800">
              Password:
            </label>
            <input
              type="password"
              className="w-[80%] max-w-[300px] py-1 outline-none border border-slate-400 rounded-md bg-opacity-30 indent-3 text-black"
              placeholder={"confirm password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </span>
          <Button text={"Update"} />
        </form>
      )}
    </div>
  );
}

export default UpdateProfile;
