import Image from "next/image";
import Empty from "@/components/Empty/Empty";
import formatDistanceToNow from "date-fns/formatDistanceToNow"
import { Suspense } from 'react';
import Loader from "@/components/Loader/Loader";
import { getSellerProduct } from "../../../../../../Actions/getSellerProduts";
import Link from "next/link";
import SellerProduct from "@/components/ActionButton/SellerProduct";



async function MyProducts({params}: any) {
  const res = await getSellerProduct(params.id)
  return (
    <>
    <h1 className="my-3 ml-3 text-lg font-semibold sm:text-2xl">My Products</h1>
    <Suspense fallback={<Loader />}>
    <div className="w-[98%] mx-auto rounded-md py-3 overflow-hidden border border-slate-400">
      <div className="overflow-x-auto no-scrollbar flex flex-col pl-3 mx-auto">
        <div className="grid grid-cols-7 mb-2 font-semibold place-items-center w-[1300px] text-sm mdl:text-base">
          <p>Image</p>
          <p>ID</p>
          <p>Title</p>
          <p>Price</p>
          <p>Brand</p>
          <p>Updated Date</p>
          <p>Action</p>
        </div>
        {res?.length > 0 ? (
          res.map((product: any) => {
            return (
              <div
                key={product._id}
                className="grid grid-cols-7 place-items-center text-sm w-[1300px] my-2"
              >
                <div className="col-span-1">
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    width={50}
                    height={100}
                    className="col-span-1"
                  />
                </div>
                <div className="col-span-1">
                  <Link href={`/me/product/seller/updateProduct/${product._id}`}>
                  <p>{product._id}</p>
                  </Link>
                </div>
                <div className="col-span-1">
                  <p>{product.title}</p>
                </div>
                <div className="col-span-1">
                  <p>${product.price}</p>
                </div>
                <div className="col-span-1">
                  <p>{product.brand}</p>
                </div>
                <div className="col-span-1">
                  {formatDistanceToNow(new Date(product.updatedAt), {
                    addSuffix: true,
                  })}
                </div>
               <div className="flex justify-center items-center col-span-1 text-lg cursor-pointer">
               <SellerProduct id={product._id}/>
               </div>
              </div>
            );
          })
        ) : (
          <Empty text={"You haven't posted any product Yet!"} />
        )}
      </div>
    </div>
    </Suspense>
    </>
  );
}

export default MyProducts;
