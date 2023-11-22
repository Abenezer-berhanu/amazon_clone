"use client";
import { useState } from "react";
import logo from "@/Images/amazon_logo.png";
import Image from "next/image";
import { MdLocationOn } from "react-icons/md";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from "react-redux";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { RxAvatar } from "react-icons/rx";

function Header() {
  const [displayList, setDisplayList] = useState(false);
  const router = useRouter();
  const { cartItems, shippingAddress } = useSelector(
    (state: any) => state.cart
  );

  const { userInfo } = useSelector((state: any) => state.auth);
    
  let role;

  if(userInfo){
    userInfo.msg.role === "admin"
    ? (role = "admin")
    : userInfo.msg.role === "seller"
    ? (role = "seller")
    : userInfo.msg.role === "buyer"
    ? (role = "buyer")
    : "";
  }
  const id = userInfo?.msg ? userInfo.msg._id : null

  return (
    <div className="flex w-full justify-between items-center bg-amazon_blue h-20 text-lightText gap-5 px-3 sticky top-0 z-50 bg-opacity-90">
      {/* logo */}
      <Link href="/">
        <Image
          src={logo}
          alt="amazon-logo"
          className="h-full w-[100px] sm:w-20 border border-transparent hover:border-white duration-200 cursor-pointer"
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

      {userInfo && (
        <>
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
            <div className="flex flex-col justify-center items-center p-3 text-white gap-1 text-sm relative border border-transparent hover:border-white duration-200 cursor-pointer h-full">
              <AiOutlineShoppingCart className="text-lg sm:text-3xl" />
              cart
              <div className="absolute bg-amazon_yellow text-black w-4 text-xs text-center h-4 rounded-full">
                {cartItems.length}
              </div>
            </div>
          </Link>
        </>
      )}

      {/* user */}
      <div className="text-xs cursor-pointer h-full flex flex-col p-3 justify-center">
        <div className="flex items-center text-amazon_yellow">
          {userInfo ? (
            <RxAvatar
              className="text-2xl"
              onClick={() => setDisplayList(!displayList)}
            />
          ) : (
            <p onClick={() => router.push("/auth/signin")}>Login</p>
          )}

          {displayList && (
            <div className="bg-white p-3 text-slate-800 absolute rounded-md flex flex-col gap-3 right-10 top-14">
              <div className="px-2 cursor-default">
                <p className="text-lg font-sans text-slate-500">
                  {userInfo.msg.email}
                </p>
                <span className="flex gap-2 font-semibold">
                  <p>{userInfo.msg.username}</p>
                  <p>{userInfo.msg.role}</p>
                </span>
              </div>
              <div className="flex flex-col">
                {
                  <Link
                    href={`/user/profile/${id}`}
                    className="px-10 py-2 hover:bg-slate-200 duration-200 shadow-sm"
                  >
                    Profile
                  </Link>
                }

                {role !== "admin" && role !== "seller" && (
                  <Link
                    href={`/me/myOrders/${id}`}
                    className="px-10 py-2 hover:bg-slate-200 duration-200 shadow-sm"
                  >
                    My Orders
                  </Link>
                )}
                {role === "seller" && (
                  <Link
                    href={`/me/seller/myOrdersList/${id}`}
                    className="px-10 py-2 hover:bg-slate-200 duration-200 shadow-sm"
                  >
                    Orders list
                  </Link>
                )}

                {role === "seller" && (
                  <Link
                    href={`/me/seller/myProducts/${id}`}
                    className="px-10 py-2 hover:bg-slate-200 duration-200 shadow-sm"
                  >
                    My Products
                  </Link>
                )}

                {role === "admin" && (
                  <Link
                    href="/admin/users"
                    className="px-10 py-2 hover:bg-slate-200 duration-200 shadow-sm"
                  >
                    All Users
                  </Link>
                )}

                {role === "admin" && (
                  <Link
                    href="/admin/orders"
                    className="px-10 py-2 hover:bg-slate-200 duration-200 shadow-sm"
                  >
                    All Orders
                  </Link>
                )}
                {role === "admin" && (
                  <Link
                    href="/admin/products"
                    className="px-10 py-2 hover:bg-slate-200 duration-200 shadow-sm"
                  >
                    All Products
                  </Link>
                )}
                {role !== "buyer" && (
                  <Link
                    href="/me/seller/newProduct"
                    className="px-10 py-2 hover:bg-slate-200 duration-200 shadow-sm"
                  >
                    Post Product
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
