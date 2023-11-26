"use client";
import React from "react";
import { ProductProps } from "../../../type";
import Image from "next/image";
import New from "../New/New";
import Prices from "../Prices/Prices";
import { useSelector, useDispatch } from "react-redux";
import { AiFillDelete } from "react-icons/ai";
import { removeFromCart } from "@/features/slices/cartSlice";
import Button from "../Button/Button";
import Link from "next/link";

function useCart({ products }: any) {
  const { cartItems, additionalFees } = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const handleDeleteFromCart = (id: string) => {
    dispatch(removeFromCart(id));
  };

  return (
    <div className="w-[95%] m-auto gap-2 py-3 flex flex-col-reverse mdl:grid grid-cols-6">
      <div className="p-2 col-span-4">
        <h1 className="text-2xl">Shipping Cart</h1>
        <hr className="border border-slate-500 mt-2" />
        {products.map((product: ProductProps) => (
          <div key={product._id} className="p-3 grid grid-cols-4 relative">
            <div className="col-span-1">
              <Link href={`/product/${product._id}`}>
                <Image
                  src={product.image ?? product.thumbnail}
                  alt={product.title}
                  width={300}
                  height={200}
                  className="w-full scale-90 h-[200px] object-cover hover:scale-100 duration-300"
                />
              </Link>
            </div>
            <div className="col-span-3 flex flex-col gap-1 relative">
              <p className="text-sm font-semibold tracking-wide">
                {product.brand}
                <small className="text-xs font-thin text-black">
                  {product.category}
                </small>
              </p>
              <Link href={`/product/${product._id}`}>
                <h1 className="text-slate-600 font-semibold tracking-wider">
                  {product.title}
                </h1>
              </Link>

              {product.isNew && <New />}
              <div className="flex gap-1 font-serif font-semibold">
                Price:{" "}
                <Prices oldPrice={product.oldPrice} price={product.price} /> X
                {product.qty} = {product.price * product.qty!}
              </div>
              <p className="text-sm font-sans">{product.description}</p>
            </div>
            <AiFillDelete
              className="text-amazon_black hover:text-slate-700 duration-300 text-xl absolute right-5 bottom-5"
              onClick={() => handleDeleteFromCart(product._id)}
            />
          </div>
        ))}
      </div>
      <div className="border grid border-l-black col-span-2 p-2 sml:flex mdl:flex-col items-center justify-around mdl:items-start mdl:justify-normal">
        <h1 className="text-lg sml:text-xl font-semibold font-sans">
          Subtotal ({cartItems.length}) Items
        </h1>
        <h1 className="font-semibold text-sm sml:text-lg font-sans border border-b-black m-2">
          Total Price: ${additionalFees.totalPrice}
        </h1>
        <hr />
        <div className="grid gap-1">
          <p className="font-semibold text-sm font-sans ml-2">
            Items Price: ${additionalFees.itemsPrice}
          </p>
          <p className="font-semibold text-sm font-sans ml-2">
            Tax: ${additionalFees.tax}
          </p>
          <p className="font-semibold text-sm font-sans ml-2">
            Delivery fee: ${additionalFees.shippingFee}
          </p>
        </div>
        <Link href={"/cart/shipping"}>
          <Button />
        </Link>
      </div>
    </div>
  );
}

export default useCart;
