"use client";
import { useSearchParams } from "next/navigation";
import { useGetProductsByQueryQuery } from "@/features/slices/productSlice";
import Loader from "@/components/Loader/Loader";
import Products from "@/components/Products/Products";

function usePage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search");
  const { data, isLoading }: any = useGetProductsByQueryQuery(search);
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : data?.length > 0 ? (
        <>
          <Products productsList={data} />
        </>
      ) : (
        <h1 className="text-3xl text-black text-center ">
          No Product has Found!
        </h1>
      )}
    </>
  );
}

export default usePage;
