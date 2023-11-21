"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { useGetProductByIdQuery } from "@/features/slices/productSlice";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";
import New from "@/components/New/New";
import Prices from "@/components/Prices/Prices";
import { useDispatch } from "react-redux";
import { addToCart } from "@/features/slices/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ProductProps } from "../../../../type";

function usePage() {
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const params = useParams();
  const { data, isLoading } = useGetProductByIdQuery(params.id);
  const handleCart = (product: ProductProps) => {
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
    <div>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <>
          <div className="grid mdl:grid-cols-5 grid-cols-3 border gap-2 p-2">
            <div className="col-span-3 mdl:col-span-2 text-center overflow-hidden w-full align-center ">
              <Image
                src={`${data.msg.image ? data.msg.image : data.msg.thumbnail}`}
                alt="image"
                width={500}
                height={500}
                priority
                className="scale-95 h-[400px] object-contain hover:scale-100 duration-300 w-full"
              />
            </div>
            <div className="col-span-3 flex flex-col justify-center gap-3 text-center mdl:text-start">
              <p className="text-lg font-semibold tracking-wide">
                {data.msg.brand}
                <small className="text-sm font-thin text-black">
                  {data.msg.category}
                </small>
              </p>
              <h1 className="text-slate-600 font-bold sm:text-2xl tracking-wider">
                {data.msg.title}
              </h1>
              {data.msg.isNew && <New />}
              <div className="flex gap-1 font-serif font-semibold mdl:justify-start justify-center">
                Price:{" "}
                <Prices oldPrice={data.msg.oldPrice} price={data.msg.price} />
              </div>
              <p className="text-md font-sans">{data.msg.description}</p>
            </div>
            <div className="p-3 col-span-3 flex justify-center items-center">
              <div className="shadow-xl duration-300 border border-opacity-10 border-slate-600 hover:shadow-2xl rounded-md flex flex-col items-center w-3/5 gap-2 p-2">
                <p className="text-xs sm:text:sm text-slate-600 font-semibold mb-3">
                  To buy, add to cart
                </p>

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

                <button
                  className="bg-amazon_yellow rounded-lg text-slate-700 w-3/5 p-1 text-xs sm:text-sm"
                  onClick={() => handleCart(data.msg)}
                >
                  {" "}
                  Add to Cart{" "}
                </button>
                <div className="bg-black h-2"></div>
                <button className="text-slate-700 bg-slate-500 w-3/5 p-1 text-xs sm:text-base">
                  {" "}
                  Add to favorite{" "}
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default usePage;
