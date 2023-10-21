"use client";
import { useEffect, useState } from "react";
import Banner from "@/components/Banner/Banner";
import Products from "@/components/Products/Products";

export default function Home() {
  const [productDatas, setProductDatas] = useState<any>([]);

  useEffect(() => {
    const getProductData = async () => {
      const res = await fetch("https://fakestoreapiserver.reactbd.com/tech");
      const productData = await res.json();
      setProductDatas(productData);
    };
    getProductData();
  }, []);
  return (
    <main>
      <div className="max-w-screen-2xl mx-auto relative">
        <Banner />
        <div className="relative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          <Products productsList={productDatas} />
        </div>
      </div>
    </main>
  );
}
