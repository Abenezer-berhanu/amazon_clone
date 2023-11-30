"use client";
import Banner from "@/components/Banner/Banner";
import Loader from "@/components/Loader/Loader";
import Products from "@/components/Products/Products";
import { useGetAllProductQuery } from "@/features/slices/productSlice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;
  const categoryQuery = searchParams.get("category") || "all";
  const { data, isLoading } = useGetAllProductQuery({
    page,
    category: categoryQuery,
  });
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
        {data?.page && data?.pages && !searchParams.get("category") && (
          <div className="p-2 bg-black text-black flex font-bold justify-center items-center h-10 gap-2">
            {Array.from(Array(data?.pages).keys()).map((x: number) => (
              <Link
                href={`?page=${x + 1}`}
                key={x}
                className="bg-white w-6 py-1 text-center"
              >
                {x + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

// className="bg-white my-2 rounded-sm p-2 h-5/6 flex items-center justify-center text-sm"
