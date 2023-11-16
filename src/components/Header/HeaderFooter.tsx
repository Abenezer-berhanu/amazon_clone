"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Button from "../Button/Button";
import { useLoginOutMutation } from "@/features/slices/userSlice";

function HeaderFooter() {
  const [userLogout, {isLoading}] = useLoginOutMutation();
  const handleLogout = () => {
    userLogout('')
  };
  return (
    <div className="flex p-3 text-sm items-center gap-3 text-white bg-amazon_light sticky top-20 z-40">
      <p className="justify-center flex items-center gap-1 border border-transparent hover:border-white cursor-pointer duration300">
        <AiOutlineMenu />
        All
      </p>
      <p className="hidden md:inline-flex  hover:border-white">Todays Deals</p>
      <p className="hidden md:inline-flex hover:border-white">
        Customer Service
      </p>
      <p className="hidden md:inline-flex hover:border-white">Registry</p>
      <p className="hidden md:inline-flex hover:border-white">Gift Cards</p>
      <p className="hidden md:inline-flex hover:border-white">Sell</p>
      <Button click={handleLogout} text="logout" />
    </div>
  );
}

export default HeaderFooter;
