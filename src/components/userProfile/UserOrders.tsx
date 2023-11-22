import { GrValidate } from "react-icons/gr";
import { IoTimerSharp } from "react-icons/io5";
import { MdDeliveryDining } from "react-icons/md";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import Empty from "../Empty/Empty";

const getUserOrders = async (id: any) => {
  // const random = Math.floor(Math.random() * 5 + 5) * 1000;
  // await new Promise((resolve) => setTimeout(resolve, random));
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/userOrders/${id}`,{cache: 'no-cache'}
  );
  const order = await res.json();
  return order;
};

async function UserOrders({ id }: any) {
  const {res}: any = await getUserOrders(id);
  return (
    <div className="w-[98%] mx-auto rounded-md border border-slate-400 py-3 overflow-hidden">
      <div className="overflow-x-auto no-scrollbar flex flex-col pl-3 mx-auto">
        <div className="grid grid-cols-6  mb-2 font-semibold place-items-center w-[1200px] text-sm mdl:text-base">
          <p>ID</p>
          <p>Total Price</p>
          <p>Payment</p>
          <p>is Payment</p>
          <p>is Delivered</p>
          <p>Date</p>
        </div>
        {res.length > 0 ? (
          res.map((order: any) => {
            return (
              <div
                key={order._id}
                className="grid grid-cols-6 place-items-center text-sm w-[1200px]"
              >
                <p>{order._id}</p>
                <p>${order.totalPrice}</p>
                <p className="uppercase">{order.paymentMethod}</p>
                <div>
                  {order.isPaid ? (
                    <p className="flex">
                      <GrValidate className="text-xl" />
                      <small>Paid</small>
                    </p>
                  ) : (
                    <p className="flex">
                      <IoTimerSharp className="text-xl" />
                      <small>Waiting</small>
                    </p>
                  )}
                </div>
                <div>
                  {order.isDelivered ? (
                    <p className="flex">
                      <GrValidate className="text-xl" />
                      <small>Delivered</small>
                    </p>
                  ) : (
                    <p className="flex">
                      <MdDeliveryDining className="text-xl" />
                      <small>on way</small>
                    </p>
                  )}
                </div>
                <div>
                  {formatDistanceToNow(new Date(order.createdAt), {
                    addSuffix: true,
                  })}
                </div>
              </div>
            );
          })
        ) : (
          <Empty text={"You haven't ordered anything Yet!"} />
        )}
      </div>
    </div>
  );
}

export default UserOrders;
