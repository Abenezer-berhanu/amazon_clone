import React, { Suspense } from "react";
import { getOrderDetail } from "../../../../../../../Actions/getOrderDetail";
import Image from "next/image";
import Link from "next/link";
import Loader from "@/components/Loader/Loader";

async function page({ params }: { params: { id: string } }) {
  const order = await getOrderDetail(params.id);
  return order ? (
    <div className="flex flex-col gap-5 px-5 py-3 max-w-[1400px] mx-auto font-xs">
      <h1 className="p-2 w-full text-lg sml:text-3xl font-extrabold tracking-widest bg-slate-300 mb-3">
        {" "}
        Order Detail
      </h1>
      <Suspense fallback={<Loader />}>
      <div className="border border-slate-400 shadow-orange-900 p-2 sml:p-4 rounded-md gap-2 ">
        <p className="text-xs sml:text-base font-semibold tracking-wider">Order Id: {order._id}</p>
        <h1 className="p-2 w-full text-base sml:text-xl font-extrabold tracking-widest bg-slate-300 mb-2">
          Shipping Address
        </h1>
        <div className="flex flex-col gap-3 font-serif font-semibold text-sm sml:text-md tracking-wider">
          <p>Country: {order.shippingAddress.country}</p>
          <p>City: {order.shippingAddress.city}</p>
          <p>Receiver Phone: {order.shippingAddress.phoneNumber}</p>
          <p>Receiver Name: {order.shippingAddress.receiverName}</p>
        </div>
      </div>
      <div>
        <h1 className="p-2 w-full text-lg sml:text-xl font-extrabold tracking-widest bg-slate-300 mb-2">
          Payment Method
        </h1>
        <p>Method: {order.paymentMethod}</p>
        {order?.isPaid ? (
          <span className="bg-green-300 rounded-md text-xs hover:bg-red-200 duration-300">
            <small className="text-center font-semibold tracking-widest text-sm p-2 w-full rounded-t-sm">Paid</small>
          </span>
        ) : (
          <span className="bg-red-300 rounded-md text-xs hover:bg-red-200 duration-300">
            <small className="text-center font-semibold tracking-widest text-sm p-2 w-full rounded-t-sm">Not Paid</small>
          </span>
        )}
      </div>
      <div>
        <h1 className="p-2 w-full text-lg sml:text-xl font-extrabold tracking-widest bg-slate-300 mb-2">
          Delivery Status
        </h1>
        {order?.isDelivered ? (
          <span className="bg-green-300 rounded-md text-xs hover:bg-red-200 duration-300">
            <small className="text-center font-semibold tracking-widest text-sm p-2 w-full rounded-t-sm">Delivered</small>
          </span>
        ) : (
          <span className="bg-red-300 rounded-md text-xs hover:bg-red-200 duration-300">
            <small className="text-center font-semibold tracking-widest text-sm p-2 w-full rounded-t-sm">Not Delivered</small>
          </span>
        )}
      </div>
      <div className="p-3 sml:p-8 border border-slate-300 rounded-t-md my-4 shadow-md gap-3">
        <h1 className="p-2 w-full text-lg sml:text-xl font-extrabold tracking-widest bg-slate-300 mb-2">
          Order Items
        </h1>
        {order?.orderItems.map((o: any) => (
          <div
            key={o._id}
            className="flex gap-2 w-full justify-between items-center"
          >
            <Image src={o.image} alt={o.title} width={70} height={100} />
            <Link href={`/product/${o.product}`} className="text-xs sml:text-base">{o.title}</Link>
            <p className="text-xs sml:text-base">
              {o.qty} X {o.price} = {o.qty * o.price}
            </p>
          </div>
        ))}
      </div>
      <div className="p-2 sml:p-4 border border-slate-300 rounded-t-md mb-4 shadow-md gap-3 w-full">
        <h1 className="p-2 w-full text-lg sml:text-xl font-extrabold tracking-widest bg-slate-300 mb-2">
          Price
        </h1>
        <div className="flex flex-col gap-3">
          <span className="w-full flex justify-between">
            <p>Items Price:</p>
            <p>${order.itemsPrice}</p>
          </span>
          <span className="w-full flex justify-between">
            <p>Tax Price:</p>
            <p>${order.taxPrice}</p>
          </span>
          <span className="w-full flex justify-between">
            <p>Shipping Price:</p>
            <p>${order.shippingPrice}</p>
          </span>
          <span className="w-full flex justify-between font-semibold">
            <p>Total Price:</p>
            <p>${order.totalPrice}</p>
          </span>
        </div>
      </div>
      </Suspense>
    </div>
  ) : (
    <div>
      <h1>No Order has found</h1>
    </div>
  );
}

export default page;
