import Loader from "@/components/Loader/Loader";
import React from "react";
import { Suspense } from "react";
import Box from "../boxes/Box";
import { getAllProducts } from "../../../../Actions/getAllProducts";
import { getAllOrders } from "../../../../Actions/getAllOrders";
import Image from "next/image";

async function Admin_products() {
  const res = await getAllProducts();
  const order = await getAllOrders();
  const totalProPrice = res?.reduce(
    (total: number, cur: any) => total + cur.price,
    0
  );
  const totalOrdPrice = order?.reduce(
    (total: number, cur: any) => total + cur.totalPrice,
    0
  );
  const orderedOrderLength = order.length || 0;
  const totalProductLength = res.length || 0;
  return (
    <>
      <h1 className="mt-10 ml-3 text-lg font-semibold sm:text-2xl">
        All Products and Orders
      </h1>
      {order && res ? (
        <Suspense fallback={<Loader />}>
          <div className="w-full grid grid-cols-2 gap-4 max-sm:grid-cols-1">
            <Box label="Total Products" amount={totalProductLength} index={1} />
            <Box
              label="Total Product Price"
              amount={totalProPrice}
              price={true}
              index={2}
            />
            <Box label="Total Order" amount={orderedOrderLength} index={3} />
            <Box
              label="Total Order Price"
              amount={totalOrdPrice}
              price={true}
              index={4}
            />
            <div className="col-span-2 max-sm:col-span-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overflow-x-auto">
              <h1 className="py-3 mb-2 w-full text-lg font-semibold sm:text-2xl bg-slate-200">
                All Products
              </h1>
              <table className="table-auto w-full border-none">
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>ID</th>
                    <th>PRICE</th>
                    <th>NAME</th>
                    <th>BRAND</th>
                  </tr>
                </thead>
                <tbody>
                  {res.length > 0
                    ? res.map((product: any) => (
                        <tr key={product._id}>
                          <td>
                            <Image
                              src={product.image || product.thumbnail}
                              alt={product.title}
                              width={50}
                              height={50}
                              className="h-20 object-contain"
                            />
                          </td>
                          <td>{product._id}</td>
                          <td>${product.price}</td>
                          <td className="capitalize">{product.title}</td>
                          <td className="capitalize">{product.brand}</td>
                        </tr>
                      ))
                    : ""}
                </tbody>
              </table>
            </div>
          </div>
        </Suspense>
      ) : (
        <h1 className="my-3 ml-3 text-lg font-semibold sm:text-2xl">
          No Products and Orders has found!
        </h1>
      )}
    </>
  );
}

export default Admin_products;
