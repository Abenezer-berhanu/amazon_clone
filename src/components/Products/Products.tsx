"use client";
import { useState } from "react";
import { ProductProps } from "../../../type";
import Product from "./Product";

function Products({ productsList }: any) {
  const [amount, setAmount] = useState(1);

  return (
    <div className="w-[95%] mx-auto p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 place-items-center">
      {productsList.map((products: ProductProps) => (
        <Product products={products} key={products._id} />
      ))}
    </div>
  );
}

export default Products;
