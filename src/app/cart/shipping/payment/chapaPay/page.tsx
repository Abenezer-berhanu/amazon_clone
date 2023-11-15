"use client";
import Image from "next/image";
import { useSelector } from "react-redux";
import Form from "@/components/Chapa/Form";

function usePage() {
  const { cartItems } = useSelector((state: any) => state.cart);
  return (
    <>
      <h2 className="text-xl mdl:text-3xl text-green-700 font-extrabold tracking-wider font-sans text-center m-2">
        Pay with Chapa
      </h2>
      <div className="px-1 grid place-items-center md:grid-cols-2 gap-2 w-[90%] mdl:w-[50%] m-auto bg-white">
        <div className="w-full h-full">
          <h2 className="text-xl mdl:text-xl text-slate-700 font-bold tracking-wider font-sans text-center m-2">
            My Products
          </h2>
          {cartItems.map((item: any) => {
            return (
              <div key={item._id} className="flex justify-center items-center">
                <Image
                  src={item.image}
                  alt="product image"
                  width={30}
                  height={30}
                />
                <p className="text-xs">
                  <b>{item.title.substring(0, 20)}</b>..
                </p>
                <p className="text-xs">
                  <b>{`$${item.price} X ${item.qty} = $${
                    item.price * item.qty
                  }`}</b>
                </p>
              </div>
            );
          })}
        </div>
        <div className="w-full">
          <Form />
        </div>
      </div>
    </>
  );
}

export default usePage;
