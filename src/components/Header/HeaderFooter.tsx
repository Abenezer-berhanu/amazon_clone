"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Button from "../Button/Button";
import { useLoginOutMutation } from "@/features/slices/userSlice";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { clearCredentials } from "@/features/slices/userSliceStore";
import Loader from "../Loader/Loader";
import { MdFavorite } from "react-icons/md";
import { FaShoppingBag } from "react-icons/fa";


function HeaderFooter() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state: any) => state.auth);
  const [userLogout, { isLoading }] = useLoginOutMutation();
  const router = useRouter();
  const handleLogout = async () => {
    dispatch(clearCredentials());
    await userLogout("").then(() => router.push("/auth/signin"));
  };
  return (
    <div className="flex p-3 text-sm items-center gap-3 text-white bg-amazon_light sticky top-20 z-40">
      {!isLoading && !userInfo && <p className="hidden md:inline-flex cursor-pointer duration300" onClick={() => router.push('/auth/signup')}>Registry</p>}
      {userInfo && <Button click={handleLogout} text="logout" />}
      <div className="relative w-[150] h-[150] m-auto">
      {isLoading && <Loader />}
      </div>
    </div>
  );
}

export default HeaderFooter;
