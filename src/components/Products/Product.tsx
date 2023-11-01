"use client";
import { AiOutlineHeart } from "react-icons/ai";
import { addToCart } from "@/features/slices/cartSlice";
import { useDispatch } from "react-redux";
import Prices from "../Prices/Prices";
import SaveAmount from "../SaveAmount/SaveAmount";
import Image from "next/image";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useState } from "react";

function Product({ products, amount }: any) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    product = { ...product, qty: qty };
    dispatch(addToCart(product));
  };

  const handleInc = () => {
    setQty(qty + 1);
  };

  return (
    <div
      key={products._id}
      className="w-full bg-white rounded-md gap-2 group text-black p-4 relative grid border border-slate-300"
    >
      <Image
        src={products.image}
        alt={products.title}
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
      <SaveAmount
        oldPrice={Number(products.oldPrice)}
        price={Number(products.price)}
      />
      <hr className="mb-3" />
      <div>
        <p className="text-sm text-slate-500">{products.category}</p>
        <p className="font-semibold tracking-wider">{products.title}</p>
        <Prices oldPrice={products.oldPrice} price={products.price} />
        <p className="text-sm text-slate-500">
          {products.description.substring(0, 120)}...
        </p>
      </div>
      <div className="w-[100%] grid place-items-center gap-2 sm:flex items-center">
        <button
          className="p-2 h-2/3 w-[50%] mx-auto my-2 rounded-md hover:bg-amazon_yellow hover:text-black font-semibold duration-300 bg-amazon_blue text-white"
          onClick={() => handleAddToCart(products)}
        >
          add to cart
        </button>
        <div className="w-[50%] flex justify-around items-center h-2/3  ">
          <button
            className="bg-amazon_yellow hover:bg-amazon_yellow_hover rounded-sm duration-200 p-2"
            onClick={() => {}}
          >
            <AiOutlineMinus />
          </button>
          {qty}
          <button
            className="bg-amazon_yellow hover:bg-amazon_yellow_hover rounded-sm duration-200 p-2"
            onClick={handleInc}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
