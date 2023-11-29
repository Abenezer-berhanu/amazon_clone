import React from "react";
import Layout from "./Layout";
import Admin_orders from "@/components/admin/orders/Admin_orders";
import Admin_products from "@/components/admin/products/Admin_products";
import Admin_users from "@/components/admin/users/Admin_users";

function page() {
  return (
    <Layout>
      <div className="grid gap-10">
      <Admin_users />
      <Admin_products />
      <Admin_orders />
      </div>
    </Layout>
  );
}

export default page;
