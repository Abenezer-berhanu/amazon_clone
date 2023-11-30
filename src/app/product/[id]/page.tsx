"use client";
import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import {
  useGetProductByIdQuery,
  useProductRatingMutation,
} from "@/features/slices/productSlice";
import Loader from "@/components/Loader/Loader";
import Image from "next/image";
import New from "@/components/New/New";
import Prices from "@/components/Prices/Prices";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/features/slices/cartSlice";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ProductProps } from "../../../../type";
import Link from "next/link";
import { toast } from "react-toastify";
import Rating from "@/components/Rating/Rating";

function usePage() {
  const formRef: any = useRef();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState<string>();
  const [comment, setComment] = useState<string>();
  const params = useParams();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { data, isLoading, refetch } = useGetProductByIdQuery(params.id);
  const [reviewProductMutation, { isLoading: reviewProductLoading }] =
    useProductRatingMutation();
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

  const handleRatingSubmit = async (e: any) => {
    e.preventDefault();
    const reqBody = {
      user: userInfo?.msg._id,
      rating,
      comment,
      id: params.id,
      name: userInfo?.msg.username,
    };
    const res: any = await reviewProductMutation(reqBody);
    if (res.data) {
      toast.success(res.data.msg);
      refetch();
    } else {
      toast.error(res.error.data.msg);
    }
    formRef.current?.reset();
  };

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : data ? (
        <>
          <div
            className={`grid ${
              data?.msg?.imagesURlList ? "mdl:grid-cols-8" : "mdl:grid-cols-6"
            } border gap-2 p-2`}
          >
            {data.msg.imagesURlList && (
              <div className="gap-2 p-2 col-span-3 mdl:col-span-1 grid grid-cols-3 mdl:grid-cols-1">
                {data.msg.imagesURlList.map((image: string, index: number) => (
                  <Image
                    src={image}
                    alt="image"
                    width={100}
                    height={200}
                    key={index}
                    className="h-20"
                  />
                ))}
              </div>
            )}
            <div className="col-span-3 mdl:col-span-2 overflow-hidden w-full align-center">
              <Image
                src={`${
                  data?.msg?.image ? data?.msg?.image : data?.msg?.thumbnail
                }`}
                alt="image"
                width={500}
                height={500}
                priority
                className="scale-95 h-[400px] sml:object-contain hover:scale-100 duration-300 w-full"
              />
            </div>
            <div className="mdl:col-span-4 col-span-3 flex flex-col justify-center gap-3 text-center ">
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
              <div className="flex gap-1 font-serif font-semibold justify-center">
                Price:{" "}
                <Prices oldPrice={data.msg.oldPrice} price={data.msg.price} />
              </div>
              <p className="text-md font-sans">{data.msg.description}</p>
            </div>
            <div className="col-span-5 text-sm my-3">
              <h2 className="bg-blue-200 text-slate-700 font-semibold shadow-sm w-[98%] bg-opacity-20 mx-auto mb-2 rounded-sm text-center text-lg p-2">
                Reviews
              </h2>
              {reviewProductLoading && <Loader />}
              {data.msg?.reviews.length > 0 ? (
                <div>
                  {data.msg.reviews.map((review: any) => (
                    <div key={review._id}>
                      <strong className="mb-2 capitalize">{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <h1 className="bg-blue-200 text-slate-700 font-semibold shadow-sm w-[98%] bg-opacity-20 mx-auto mb-2 rounded-sm text-center text-xl p-2">
                  No Review Yet
                </h1>
              )}
              <h2 className="bg-blue-200 text-slate-700 font-semibold shadow-sm w-[98%] bg-opacity-20 mx-auto mb-2 rounded-sm text-center text-lg p-2">
                Add Review
              </h2>
              <div>
                {userInfo?.msg && userInfo?.msg.role === "buyer" ? (
                  <form onSubmit={handleRatingSubmit} ref={formRef}>
                    <div className="my-2 grid text-sm font-semibold tracking-wide text-slate-700">
                      <label className="">Rating:</label>
                      <select
                        onChange={(e) => setRating(e.target.value)}
                        required
                      >
                        <option value="">Select</option>
                        <option value={"1"}>1 - Poor</option>
                        <option value={"2"}>2 - Fair</option>
                        <option value={"3"}>3 - Good</option>
                        <option value={"4"}>4 - Very Good</option>
                        <option value={"5"}>5 - Excellent</option>
                      </select>
                    </div>
                    <div className="my-2">
                      <textarea
                        rows={4}
                        cols={30}
                        required
                        className="w-full indent-1 text-sm outline-none text-slate-700"
                        placeholder="Write product Rating.."
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </div>
                    <button
                      // disabled={reviewLoading}
                      type="submit"
                      className="bg-amazon_blue text-white hover:text-black px-2 py-2 rounded-sm text-semibold hover:bg-amazon_yellow duration-300"
                    >
                      Add Review
                    </button>
                  </form>
                ) : userInfo?.msg && userInfo?.msg.role !== "buyer" ? (
                  <div>
                    <h3 className="bg-blue-200 text-slate-700 font-semibold shadow-sm w-[98%] bg-opacity-20 mx-auto mb-2 rounded-sm text-center text-base p-2">
                      only buyer is able to give rating!
                    </h3>
                  </div>
                ) : userInfo?.msg ? (
                  <p className="font-serif bg-yellow-200 indent-3 shadow-md">
                    Person who&apos;s not logged in can&apos;t review products
                    <Link href="/auth/signin">sign in</Link>
                  </p>
                ) : (
                  ""
                )}
              </div>
            </div>
            <div className="p-3 col-span-4 flex justify-center items-center">
              <div className="shadow-xl duration-300 border border-opacity-10 border-slate-600 hover:shadow-2xl rounded-md flex flex-col items-center w-3/5 gap-2 p-2">
                <p className="text-xs sm:text:sm text-slate-600 font-semibold mb-3">
                  To buy add to cart
                </p>

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

                <button
                  className="bg-amazon_yellow rounded-lg text-slate-700 w-3/5 p-1 text-xs sm:text-sm"
                  onClick={() => handleCart(data.msg)}
                  disabled={userInfo?.msg?.role !== "buyer" ? true : false}
                >
                  Add to Cart
                </button>
                <div className="bg-black h-2"></div>
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
