import Image from "next/image";
import { ProductProps } from "../../../type";
import Product from "./Product";
import {category, categoryBottom} from "@/utils/datas/category";
import { categoryType } from "../../../types/categoryType";
import Link from "next/link";

function Products({ productsList }: any) {
  return (
    <>
      <div className="grid grid-cols-2 gap-2 mb-2 w-[90%] mx-auto">
        {category.map((x: categoryType) => (
         <Link href={`?category=${x.label}`} key={x.id}>
         <div className="relative rounded-md shadow-md w-full h-60 border border-slate-400">
           <Image src={x.link} alt={x.label} fill={true} className="object-contain"/>
           <h2 className="absolute text-lg sml:text-xl p-3 w-full bg-black bg-opacity-80 left-0 top-0 font-bold text-white tracking-widest">
             {x.label}
           </h2>
         </div>
        </Link>
        ))}
      </div>
      <div className="w-[95%] mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
        {productsList.map((products: ProductProps) => (
          <Product products={products} key={products._id} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mb-2 w-[90%] mx-auto">
        {categoryBottom.map((x: categoryType) => (
         <Link href={`?category=${x.label}`} key={x.id}>
          <div className="relative rounded-md shadow-md w-full h-60 border border-slate-400">
            <Image src={x.link} alt={x.label} fill={true} className="object-contain"/>
            <h2 className="absolute text-lg sml:text-xl p-3 w-full bg-black bg-opacity-80 left-0 top-0 font-bold text-white tracking-widest">
              {x.label}
            </h2>
          </div>
         </Link>
        ))}
      </div>
    </>
  );
}

export default Products;
