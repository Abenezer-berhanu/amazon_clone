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
import { GiHamburgerMenu } from "react-icons/gi";
import { GoX } from "react-icons/go";
import Search from "../Search/Search";

function Header() {
  const [displayList, setDisplayList] = useState(false);
  const [displayHamburger, setDisplayHamburger] = useState(false);
  const router = useRouter();
  const { cartItems, shippingAddress } = useSelector(
    (state: any) => state.cart
  );

  const { userInfo } = useSelector((state: any) => state.auth);

  let role: any;

  if (userInfo) {
    role = userInfo?.msg.role === "admin";
  }
  const id = userInfo?.msg ? userInfo.msg._id : null;

  return (
    <div className="flex w-full justify-between items-center bg-amazon_blue h-20 text-lightText gap-2 mdl:gap-5 px-3 sticky top-0 z-50 bg-opacity-90">
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
          <div className="w-full h-full items-center relative hidden mdl:flex">
            <Search />
          </div>

          {/* cart */}
          <Link href="/cart">
            <div className="flex-col justify-center items-center p-3 text-white gap-1 text-sm relative border border-transparent hover:border-white duration-200 cursor-pointer h-full hidden mdl:flex">
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
      <div className="text-xs cursor-pointer h-full flex-col p-3 justify-center hidden mdl:flex">
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
                    href={`/me/myOrders/${id}`}
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
                {role === "seller" && (
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
      <GiHamburgerMenu
        className="text-4xl mdl:hidden cursor-pointer"
        onClick={() => setDisplayHamburger(!displayHamburger)}
      />

      {/* hidden nav */}

      {displayHamburger && (
        <div className="grid absolute top-0 bg-black bg-opacity-90 right-0 left-0 duration-500 w-full p-3 place-items-start rounded-md shadow-md mdl:hidden">
          <GoX
            className="text-4xl mdl:hidden cursor-pointer text-white"
            onClick={() => setDisplayHamburger(!displayHamburger)}
          />
          <div className="w-full h-20 items-center relative flex">
            <Search />
          </div>
          <div className="flex w-full justify-between items-center">
            <Link href="/cart" className="w-1/2 flex">
              <div className="flex-col justify-center items-center p-3 text-white gap-1 text-sm relative border border-transparent hover:border-white duration-200 cursor-pointer flex">
                <AiOutlineShoppingCart className="text-3xl" />
                <div className="absolute bg-amazon_yellow text-black w-4 text-xs text-center h-4 rounded-full">
                  {cartItems.length}
                </div>
              </div>
            </Link>
            <div className="text-xs cursor-pointer h-full flex-col p-3 justify-center flex w-1/2">
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
                  <div className="bg-white p-3 text-slate-800 absolute rounded-md flex flex-col gap-3 left-0 top-0">
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
                          href={`/me/myOrders/${id}`}
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
                      {role === "seller" && (
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
        </div>
      )}
    </div>
  );
}

export default Header;
