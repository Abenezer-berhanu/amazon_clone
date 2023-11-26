import Loader from "@/components/Loader/Loader";
import { Suspense } from "react";
import { formatDistanceToNow } from "date-fns";
import { IoIosTime } from "react-icons/io";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { sellerOrders } from "../../../../../Actions/sellerOrders";
import Link from "next/link";

async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await sellerOrders(id)
  return (
    <>
      <h1 className="my-3 ml-3 text-lg font-semibold sm:text-2xl">
        My Orders Lists
      </h1>
      <Suspense fallback={<Loader />}>
        <div className="w-[95%] mx-auto overflow-x-auto">
          <div>
            {res?.length > 0 ? <table className="w-full">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL PRICE</th>
                  <th>PAID</th>
                  <th>DELIVERD</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className="w-full">
                {res?.length > 0 ? (
                  res.map((order: any) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.shippingAddress.receiverName}</td>
                      <td>
                        {formatDistanceToNow(new Date(order.createdAt), {
                          addSuffix: true,
                        })}
                      </td>
                      <td>${order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          <IoCheckmarkDoneSharp />
                        ) : (
                          <IoIosTime />
                        )}
                      </td>
                      <td>
                        {order.isDelivered ? (
                          <IoCheckmarkDoneSharp />
                        ) : (
                          <IoIosTime />
                        )}
                      </td>
                      <td><Link href={`/me/product/seller/ordersDetail/${order._id}`}>Detail</Link></td>
                    </tr>
                  ))
                ) : (
                 ""
                )}
              </tbody>
            </table> : <h1>:( No order has found yet!</h1>}
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default page;
