import { revalidateTag } from "next/cache";

export const getSellerProduct = async (id: { id: string | number }) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/seller/${id}`,
      { next: { revalidate: 0 }, cache: "no-cache" }
    );
    const sellerProduct = await res.json();
    return sellerProduct;
  } catch (error) {
    console.log(error);
  }
};
