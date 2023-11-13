"use client";
import { AiOutlineHeart } from "react-icons/ai";
import { addToCart } from "@/features/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Prices from "../Prices/Prices";
import SaveAmount from "../SaveAmount/SaveAmount";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import Link from "next/link";

function Product({ products }: any) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();
  const handleAddToCart = (product: any) => {
    product = { ...product, qty: qty };
    dispatch(addToCart(product));
  };

  const handleInc = () => {
    setQty(qty + 1);
  };

  const handleDec = () => {
    setQty((prevState): any => {
      if (prevState > 1) {
        return prevState - 1;
      } else {
        return prevState;
      }
    });
  };

  return (
    <div
      key={products._id}
      className="w-full bg-white rounded-md gap-2 group text-black p-4 relative grid border border-slate-300"
    >
      <Link href={`/product/${products._id}`}>
        <Image
          src={products.image}
          alt={products.title}
          width={300}
          height={200}
          className="w-full scale-90 h-[200px] object-contain hover:scale-100 duration-300"
        />
      </Link>
      <div className="hidden absolute group-hover:flex left-0 shadow-sm shadow-slate-900 h-[10%] bg-white top-0 border border-slate-300 w-10 justify-between items-center rounded-md">
        <span className="w-full h-full flex justify-center items-center hover:bg-amazon_yellow text-2xl duration-300">
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
        <Link href={`/product/${products._id}`}>
          <p className="font-semibold tracking-wider">{products.title}</p>
        </Link>
        <Prices oldPrice={products.oldPrice} price={products.price} />
        <p className="text-sm text-slate-500">
          {products.description.substring(0, 120)}...
        </p>
      </div>
      <div className="w-[100%] grid place-items-center gap-2 sm:flex items-center">
        <button
          className="p-2 h-2/3 w-[50%] mx-auto my-2 rounded-md hover:bg-amazon_yellow hover:text-black sm:font-semibold text-xs sm:text-base duration-300 bg-amazon_blue text-white"
          onClick={() => handleAddToCart(products)}
        >
          add to cart
        </button>
        <div className="w-[50%] flex justify-around items-center h-2/3 gap-2 sm:gap-0">
          <button
            className="bg-amazon_yellow hover:bg-amazon_yellow_hover rounded-sm duration-200 p-2 text-xs sm:text-sm"
            onClick={handleDec}
          >
            <AiOutlineMinus />
          </button>
          {qty}
          <button
            className="bg-amazon_yellow hover:bg-amazon_yellow_hover rounded-sm duration-200 p-2 text-xs sm:text-sm"
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
