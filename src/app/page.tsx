"use client";
import Banner from "@/components/Banner/Banner";
import Loader from "@/components/Loader/Loader";
import Products from "@/components/Products/Products";
import { useGetAllProductQuery } from "@/features/slices/productSlice";

export default function Home() {
  const { data, isLoading } = useGetAllProductQuery();

  return (
    <main>
      <div className="max-w-screen-2xl mx-auto relative">
        <Banner />
        <div className="relative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-20">
          {isLoading ? (
            <Loader />
          ) : (
            data && <Products productsList={data.msg} />
          )}
        </div>
      </div>
    </main>
  );
}
