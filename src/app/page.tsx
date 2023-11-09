"use client";
import Banner from "@/components/Banner/Banner";
import Products from "@/components/Products/Products";
import { useGetAllProductQuery } from "@/features/slices/productSlice";

export default function Home() {
  const { data, isLoading } = useGetAllProductQuery();

  return (
    <main>
      <div className="max-w-screen-2xl mx-auto relative">
        <Banner />
        <div className="relative md:-mt-20 lgl:-mt-32 xl:-mt-60 z-20 mb-10">
          {isLoading ? (
            <div className="flex items-center justify-center h-screen">
              <div className="relative">
                <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>
          ) : (
            data && <Products productsList={data.msg} />
          )}
        </div>
      </div>
    </main>
  );
}
