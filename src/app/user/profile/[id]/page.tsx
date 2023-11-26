"use client";
import DisplayLoader from "@/components/Loader/DisplayLoader";
import UpdateProfile from "@/components/userProfile/UpdateProfile";
import UserOrders from "@/components/userProfile/UserOrders";
import UserProfile from "@/components/userProfile/UserProfile";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Suspense } from "react";

function usePage({ params }: { params: { id: string } }) {
  const { userInfo } = useSelector((state: any) => state.auth);
  return (
    <>
      <div className="w-full bg-amazon_blue h-44 relative">
        <Image
          src={
            "https://images.unsplash.com/photo-1438183972690-6d4658e3290e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt="image"
          fill={true}
          className="object-center object-cover"
        />
        <div className="bg-black w-20 h-20 z-10 rounded-full absolute m-auto left-0 right-0 bottom-[-40px]"></div>
      </div>
      <Suspense fallback={<DisplayLoader />}>
        <UserProfile id={params.id} />
      </Suspense>
      {userInfo?.msg?.role === 'buyer' && (
        <div>
          <h1 className="text-lg font-bold pl-5">My Orders</h1>
          <Suspense fallback={<DisplayLoader />}>
            <UserOrders id={params.id} />
          </Suspense>
        </div>
      )}
      <div>
        
      </div>
      <UpdateProfile id={params.id} />
    </>
  );
}

export default usePage;
