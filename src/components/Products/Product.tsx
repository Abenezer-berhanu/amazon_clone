"use client";
import { addToCart } from "@/features/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Prices from "../Prices/Prices";
import SaveAmount from "../SaveAmount/SaveAmount";
import Image from "next/image";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useRouter } from "next/navigation";

function Product({ products }: any) {
  const router = useRouter();
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

  const {userInfo} = useSelector((state:any) => state.auth)

  return (
    <div
      key={products._id}
      className="w-full min-h-[420px] bg-white rounded-md gap-2 text-black p-4 relative grid border border-slate-300"
    >
      <div onClick={() => router.push(`/product/${products._id}`)}>
        <Image
          src={products.image ? products.image : products.thumbnail}
          alt={products.title}
          width={300}
          height={200}
          priority
          className="w-full scale-90 h-[150px] object-contain hover:scale-100 duration-300"
        />
      </div>
      
      <SaveAmount
        oldPrice={Number(products.oldPrice)}
        price={Number(products.price)}
      />
      <hr className="mb-3" />
      <div>
        <p className="text-sm text-slate-500">{products.category}</p>
        <div onClick={() => router.push(`/product/${products._id}`)}>
          <p className="font-semibold tracking-wider">
            {products.title.substring(0, 20)}..
          </p>
        </div>
        <Prices oldPrice={products.oldPrice} price={products.price} />
        <p className="text-sm text-slate-500">
          {products.description.substring(0, 80)}...
        </p>
      </div>
      <div className="w-[100%] grid place-items-center gap-2 sm:flex items-center">
        <button
          className="p-2 h-2/3 w-[50%] mx-auto my-2 rounded-md hover:bg-amazon_yellow hover:text-black sm:font-semibold text-xs sm:text-base duration-300 bg-amazon_blue text-white"
          onClick={() => handleAddToCart(products)}
          disabled={userInfo?.msg?.role !== "buyer" ? true : false}
        >
          add to cart
        </button>
        <div className="w-[50%] flex justify-around items-center h-2/3 gap-2 sm:gap-0">
          <button
            className="bg-amazon_yellow hover:bg-amazon_yellow_hover rounded-sm duration-200 p-2 text-xs sm:text-sm"
            onClick={handleDec}
            disabled={userInfo?.msg?.role !== "buyer" ? true : false}
          >
            <AiOutlineMinus />
          </button>
          {qty}
          <button
            className="bg-amazon_yellow hover:bg-amazon_yellow_hover rounded-sm duration-200 p-2 text-xs sm:text-sm"
            onClick={handleInc}
            disabled={userInfo?.msg?.role !== "buyer" ? true : false}
          >
            <AiOutlinePlus />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
