import UserOrders from "@/components/userProfile/UserOrders";
import React from "react";

function page() {
  return (
    <div>
    <h1 className="text-lg sm:text-3xl font-bold pl-5">My Orders</h1>
      <UserOrders />;
    </div>
  );
}

export default page;
