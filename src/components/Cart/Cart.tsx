"use client";
import React from "react";
import { ProductProps } from "../../../type";
import Image from "next/image";
import New from "../New/New";
import Prices from "../Prices/Prices";
import { useSelector } from "react-redux";
import { useRegisterUserMutation } from "@/features/slices/userSlice";

function useCart({ products }: any) {
  const { cartItems } = useSelector((state: any) => state.cart);

  const [registerUser, { isLoading, error }] = useRegisterUserMutation();

  const handleClick = async () => {
    try {
      const res = await registerUser({
        userName: "abenu",
        email: "abenu@emil.com",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-[90%] m-auto gap-2 py-3 flex flex-col-reverse mdl:grid grid-cols-6">
      <div className="p-2 col-span-4">
        <h1 className="text-2xl">Shipping Cart</h1>
        <hr className="border border-slate-500 mt-2" />
        {products.map((product: ProductProps) => (
          <div key={product._id} className="p-3 grid grid-cols-4">
            <div className="col-span-1">
              <Image
                src={product.image}
                alt={product.title}
                width={300}
                height={200}
                className="w-full scale-90 h-[200px] object-contain hover:scale-100 duration-300"
              />
            </div>
            <div className="col-span-3 flex flex-col gap-1 relative">
              <p className="text-sm font-semibold tracking-wide">
                {product.brand}
                <small className="text-xs font-thin text-black">
                  {product.category}
                </small>
              </p>
              <h1 className="text-slate-600 font-semibold tracking-wider">
                {product.title}
              </h1>
              {product.isNew && <New />}

              <div className="flex gap-1 font-serif font-semibold">
                Price:{" "}
                <Prices oldPrice={product.oldPrice} price={product.price} /> X
                {product.qty} = {product.price * product.qty!}
              </div>
              <p className="text-sm font-sans">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border border-l-black col-span-2 p-2 flex mdl:flex-col items-center justify-around mdl:items-start mdl:justify-normal">
        <h1 className="text-lg font-semibold font-sans">
          Subtotal ({cartItems.length}) Items
        </h1>
        <h1 className="font-semibold text-md font-sans border border-b-black m-2">
          Total Price: $
          {cartItems.reduce(
            (acc: number, cur: ProductProps) => cur.price * cur.qty! + acc,
            0
          )}
        </h1>
        <hr />
        <button
          className="bg-amazon_blue hover:bg-amazon_yellow duration-300 rounded-md w-fit text-md flex-grow-0 text-white px-2 py-1 hover:text-black"
          onClick={handleClick}
        >
          {isLoading ? "loading" : "checkout"}
        </button>
      </div>
    </div>
  );
}

export default useCart;
