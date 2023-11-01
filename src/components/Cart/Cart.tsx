// "use client";
import React, { useState } from "react";
import { ProductProps } from "../../../type";
import Image from "next/image";
import New from "../New/New";
import Prices from "../Prices/Prices";

function useCart({ products }: any) {
  return (
    <div className="w-[90%] m-auto gap-2 py-3 grid grid-cols-5">
      <div className="border border-slate-800 p-2 col-span-4">
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
                  {" "}
                  {product.category}
                </small>
              </p>
              <h1 className="text-slate-600 font-semibold tracking-wider">
                {product.title}
              </h1>
              {product.isNew && <New />}
             
              <div className="flex gap-1 font-serif font-semibold">
                Price:{" "}
                <Prices oldPrice={product.oldPrice} price={product.price} />
              </div>
              <p className="text-sm font-sans">{product.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="border border-slate-800">proceed</div>
    </div>
  );
}

export default useCart;
