"use client";
import React from "react";
import { ProductProps } from "../../../type";
import Image from "next/image";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { AiOutlineHeart } from "react-icons/ai";
import PriceRounder from "@/utils/PriceRounder";
import { addToCart } from "@/features/slices/cartSlice";
import { useDispatch } from "react-redux";

function Products({ productsList }: any) {
  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    dispatch(addToCart(product));
  };
  return (
    <div className="w-[95%] mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
      {productsList.map((product: ProductProps) => (
        <div
          key={product._id}
          className="w-full bg-white rounded-md gap-2 group text-black p-4 relative grid border border-slate-300"
        >
          <Image
            src={product.image}
            alt={product.title}
            width={300}
            height={200}
            className="w-full scale-90 h-[200px] object-contain hover:scale-100 duration-300"
          />
          <div className="hidden absolute translate-x-20 group-hover:translate-x-0 group-hover:flex transition-transform duration-300 right-2 shadow-sm shadow-slate-900 h-[20%] bg-white top-[40%] border border-slate-300 w-10 flex-col justify-between items-center rounded-md">
            <span className="w-full border-b-[1px] h-[50%] border-slate-500 flex justify-center items-center hover:bg-amazon_yellow text-2xl">
              <AiOutlineShoppingCart />
            </span>
            <span className="w-full h-[50%] flex justify-center items-center hover:bg-amazon_yellow text-2xl">
              <AiOutlineHeart />
            </span>
          </div>
          <p className="absolute top-2 text-sm font-bold hover:underline right-2 tracking-wide animate-bounce">
            !save:{" "}
            <PriceRounder amount={Number(product.oldPrice! - product.price)} />
          </p>
          <hr className="mb-3" />
          <div>
            <p className="text-sm text-slate-500">{product.category}</p>
            <p className="font-semibold tracking-wider">{product.title}</p>
            <div className="flex gap-2 items-center font-semibold">
              <span className="text-sm text-slate-500 line-through">
                <PriceRounder amount={Number(product.oldPrice)} />
              </span>
              <span>
                <PriceRounder amount={Number(product.price)} />
              </span>
            </div>
            <p className="text-sm text-slate-500">
              {product.description.substring(0, 120)}...
            </p>
          </div>
          <button
            className="p-2 w-[90%] mx-auto my-2 rounded-md hover:bg-amazon_yellow hover:text-black font-semibold duration-300 bg-amazon_blue text-white"
            onClick={() => handleAddToCart(product)}
          >
            add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
