"use client";
import React from "react";
import logo from "@/Images/amazon_logo.png";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import Link from "next/link";


function Header() {

  const { cartItems, shippingAddress } = useSelector(
    (state: any) => state.cart
  );
  const {data} = useSelector(( state:any ) => state.auth)

  console.log(data)
  return (
    <div className="flex w-full justify-between items-center bg-amazon_blue h-20 text-lightText gap-5 px-3 sticky top-0 z-50 bg-opacity-90">
      {/* logo */}
      <Link href="/">
        <Image
          src={logo}
          alt="amazon-logo"
          className="h-full w-[100px] sm:w-20 border border-transparent hover:border-white duration-300 cursor-pointer"
        />
      </Link>

      {/* deliver to */}
      <div className="p-3 items-center gap-1 text-xs hidden mdl:flex h-full">
        <MdLocationOn className="text-2xl" />
        <div>
          Deliver to{" "}
          <p className="font-black text-white uppercase">
            {shippingAddress.userCity || "home"}
          </p>
        </div>
      </div>

      {/* search */}
      <div className="flex-1 w-full h-full items-center relative hidden mdl:flex">
        <input
          type="text"
          className="w-full h-[50%] rounded-md indent-3 placeholder:text-amazon_light text-black"
          placeholder="search amazon products.."
        />
        <div className="bg-amazon_yellow text-amazon_blue text-2xl flex items-center justify-center h-[50%] p-2 absolute right-0 rounded-tr-md rounded-br-md">
          <AiOutlineSearch />
        </div>
      </div>

      {/* cart */}
      <Link href="/cart">
        <div className="flex flex-col justify-center items-center p-3 text-white gap-1 text-sm relative border border-transparent hover:border-white duration-300 cursor-pointer h-full">
          <AiOutlineShoppingCart className="text-lg sm:text-3xl" />
          cart
          <div className="absolute bg-amazon_yellow text-black w-4 text-xs text-center h-4 rounded-full">
            {cartItems.length}
          </div>
        </div>
      </Link>

      {/* user */}
      <div className="text-xs cursor-pointer h-full flex flex-col p-3 justify-center">
        <div className="flex items-center text-white sm:font-bold">
        {data ? data.msg.username : 'login'}
        </div>
      </div>
    </div>
  );
}

export default Header;
