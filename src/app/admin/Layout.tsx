"use client";
import React, { ReactNode } from "react";
import { useSelector } from "react-redux";

function Layout({ children }: { children: ReactNode }) {
  const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <div className="max-w-[1400px] my-10 px-5 mx-auto">
      {userInfo?.role !== "buyer" ? (
        children
      ) : (
        <h1 className="py-3 mb-2 w-full text-lg font-semibold sm:text-2xl bg-slate-200">
          Not authorized!
        </h1>
      )}
    </div>
  );
}

export default Layout;
